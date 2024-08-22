import React, { createContext, useContext, ReactNode } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "../firebase";

interface CollectionContextProps {
  createCollection: (name: string) => Promise<void>;
  getCollections: () => Promise<QuerySnapshot<DocumentData> | null>;
  deleteCollection: (collectionId: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextProps | undefined>(undefined);

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within a CollectionContextProvider");
  }
  return context;
}

// Function to generate a unique ID using a timestamp and a random number
const generateUniqueId = (): string => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${timestamp}${randomNumber}`;
};

interface CollectionContextProviderProps {
  children: ReactNode;
}

export const CollectionContextProvider: React.FC<CollectionContextProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();

  const createCollection = async (name: string): Promise<void> => {
    const collectionId = generateUniqueId();
    await addDoc(collection(firestore, "Collection"), {
      name,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
      collectionId,
    });

    await addDoc(collection(firestore, "UserCollection"), {
      userName: currentUser?.displayName,
      userId: currentUser?.uid,
      collectionId,
      createdOn: new Date(),
    });
  };

  const getCollections = async (): Promise<QuerySnapshot<DocumentData> | null> => {
    try {
      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", currentUser?.uid)
      );
      const userCollections = await getDocs(userCollectionQuery);

      const collectionIds = userCollections.docs.map((doc) => doc.data().collectionId);

      if (collectionIds.length > 0) {
        const collectionsQuery = query(
          collection(firestore, "Collection"),
          where("collectionId", "in", collectionIds)
        );
        const collectionsSnapshot = await getDocs(collectionsQuery);
        return collectionsSnapshot;
      }

      return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const deleteCollection = async (collectionId: string): Promise<void> => {
    try {
      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", currentUser?.uid),
        where("collectionId", "==", collectionId)
      );

      const querySnapshot = await getDocs(userCollectionQuery);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  const value: CollectionContextProps = {
    createCollection,
    getCollections,
    deleteCollection,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

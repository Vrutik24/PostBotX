import React, { createContext, useContext, ReactNode } from "react";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "../firebase";
import generateUniqueId from "./GenerateUniqueId";

export interface Header {
  key: string;
  value: string;
}

export interface Collection {
  name: string;
  createdById: string;
  createdOn: Date;
  collectionId: string;
  headers: Header[];
}

interface CollectionContextProps {
  createCollection: (name: string) => Promise<void>;
  getCollections: () => Promise<Collection[] | null>;
  deleteCollection: (collectionId: string) => Promise<void>;
  renameCollection: (collectionId: string, newName: string) => Promise<void>;
  updateCollectionHeaders: (
    collectionId: string,
    newHeaders: Header[]
  ) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextProps | undefined>(
  undefined
);

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      "useCollection must be used within a CollectionContextProvider"
    );
  }
  return context;
}

interface CollectionContextProviderProps {
  children: ReactNode;
}

export const CollectionContextProvider: React.FC<
  CollectionContextProviderProps
> = ({ children }) => {
  const { currentUser } = useAuth();

  const createAnonymousUser = () => {
    const existingAnonymousUser = localStorage.getItem("anonymousUserId");
    if (existingAnonymousUser) {
      return existingAnonymousUser;
    } else {
      const anonymousUserId = generateUniqueId();
      localStorage.setItem("anonymousUserId", anonymousUserId);
      return anonymousUserId;
    }
  };

  const createCollection = async (name: string): Promise<void> => {
    const collectionId = generateUniqueId();
    const anonymousUserId = createAnonymousUser();

    const userId = currentUser?.id || anonymousUserId;
    const newCollection: Collection = {
      name,
      createdById: userId,
      createdOn: new Date(),
      collectionId,
      headers: [],
    };
    await addDoc(collection(firestore, "Collection"), newCollection);

    await addDoc(collection(firestore, "UserCollection"), {
      userId: userId,
      collectionId,
      createdOn: new Date(),
    });
  };

  const getCollections = async (): Promise<Collection[] | null> => {
    try {
      const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
      const userId = currentUser ? currentUser.id : existingAnonymousUserId;
      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", userId)
      );
      const userCollections = await getDocs(userCollectionQuery);

      const collectionIds = userCollections.docs.map(
        (doc) => doc.data().collectionId
      );

      if (collectionIds.length > 0) {
        const collectionsQuery = query(
          collection(firestore, "Collection"),
          where("collectionId", "in", collectionIds)
        );
        const collectionsSnapshot = await getDocs(collectionsQuery);

        const collections: Collection[] = collectionsSnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return {
              name: data.name,
              createdById: data.createdById,
              createdOn: data.createdOn.toDate(),
              collectionId: data.collectionId,
              headers: data.headers as Header[],
            } as Collection;
          }
        );

        return collections;
      }

      return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const renameCollection = async (
    collectionId: string,
    newName: string
  ): Promise<void> => {
    try {
      // Find the collection document by collectionId
      const collectionQuery = query(
        collection(firestore, "Collection"),
        where("collectionId", "==", collectionId)
      );
      const querySnapshot = await getDocs(collectionQuery);

      if (!querySnapshot.empty) {
        // Get the document reference for the collection
        const collectionDocRef = querySnapshot.docs[0].ref;

        // Update the name of the collection
        await updateDoc(collectionDocRef, {
          name: newName,
        });

        console.log(`Collection ${collectionId} renamed to ${newName}`);
      } else {
        console.error(`Collection with ID ${collectionId} not found`);
      }
    } catch (err: any) {
      throw new Error(`Failed to rename collection: ${err.message}`);
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

  const updateCollectionHeaders = async (
    collectionId: string,
    newHeaders: Header[]
  ): Promise<void> => {
    try {
      // Find the collection document by collectionId
      const collectionQuery = query(
        collection(firestore, "Collection"),
        where("collectionId", "==", collectionId)
      );
      const querySnapshot = await getDocs(collectionQuery);

      if (!querySnapshot.empty) {
        // Get the document reference for the collection
        const collectionDocRef = querySnapshot.docs[0].ref;

        // Update the headerPair field of the collection
        await updateDoc(collectionDocRef, {
          headers: newHeaders,
        });

        console.log(
          `Headers for Collection ${collectionId} updated successfully`
        );
      } else {
        console.error(`Collection with ID ${collectionId} not found`);
      }
    } catch (err: any) {
      throw new Error(`Failed to update headers: ${err.message}`);
    }
  };

  const value: CollectionContextProps = {
    createCollection,
    getCollections,
    renameCollection,
    deleteCollection,
    updateCollectionHeaders,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

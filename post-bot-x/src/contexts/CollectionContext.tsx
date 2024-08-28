import React, { createContext, useContext, ReactNode } from "react";
import {
  addDoc,
  doc,
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
import { Collection, Header, Notification } from "../types";

interface CollectionContextProps {
  createCollection: (name: string) => Promise<void>;
  getCollections: () => Promise<Collection[] | null>;
  deleteCollection: (collectionId: string) => Promise<void>;
  renameCollection: (collectionId: string, newName: string) => Promise<void>;
  updateCollectionHeaders: (
    collectionId: string,
    newHeaders: Header[]
  ) => Promise<void>;
  shareCollection: (
    userEmail: string,
    collectionId: string,
    collectionName: string
  ) => Promise<void>;
  acceptCollectionRequest: (collectionId: string) => Promise<void>;
  denyCollectionRequest: (id: string) => Promise<void>;
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
  const { currentUser, getUserByEmailAsync } = useAuth();

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
      updatedById: userId,
      createdOn: new Date(),
      updatedOn: new Date(),
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
        const collectionDocRef = querySnapshot.docs[0].ref;

        const existingAnonymousUser = localStorage.getItem("anonymousUserId");
        const userId = currentUser?.id || existingAnonymousUser;
        await updateDoc(collectionDocRef, {
          name: newName,
          updatedById: userId,
          updatedOn: new Date(),
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
        const collectionDocRef = querySnapshot.docs[0].ref;

        const existingAnonymousUser = localStorage.getItem("anonymousUserId");
        const userId = currentUser?.id || existingAnonymousUser;
        await updateDoc(collectionDocRef, {
          headers: newHeaders,
          updatedById: userId,
          updatedOn: new Date(),
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

  const shareCollection = async (
    userEmail: string,
    collectionId: string,
    collectionName: string
  ): Promise<void> => {
    try {
      if (!currentUser) {
        throw new Error(`You need to login first to share the collection`);
      }
      const receivingUserRecord = await getUserByEmailAsync(userEmail);
      if (!receivingUserRecord) {
        throw new Error(`User with email ${userEmail} do not exists`);
      }

      const notificationQuery = query(
        collection(firestore, "Notification"),
        where("userEmail", "==", userEmail)
      );
      const notificationsSnapshot = await getDocs(notificationQuery);

      notificationsSnapshot.docs.forEach((doc) => {
        const notificationData = doc.data();
        if (notificationData.collectionId === collectionId) {
          throw new Error(`Collection is already shared with ${userEmail}`);
        }
      });
      const receivingUserId = receivingUserRecord.id;
      const collectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", receivingUserId)
      );
      const userCollectionSnapshot = await getDocs(collectionQuery);

      userCollectionSnapshot.docs.forEach((doc) => {
        const userCollectionData = doc.data();
        if (userCollectionData.collectionId === collectionId) {
          throw new Error(
            `User with ${userEmail} already have this ${collectionName} collection`
          );
        }
      });

      const notification: Notification = {
        userEmail,
        userId: receivingUserId,
        createdOn: new Date(),
        collectionId,
        collectionName,
        senderName: currentUser?.displayName,
      };

      await addDoc(collection(firestore, "Notification"), notification);

      console.log("Collection shared successfully.");
    } catch (error) {
      console.error("Error sharing collection:", error);
      throw error;
    }
  };

  const acceptCollectionRequest = async (
    collectionId: string
  ): Promise<void> => {
    try {
      if (!currentUser) {
        throw new Error(`You need to login first to accept the collection`);
      }
      await addDoc(collection(firestore, "UserCollection"), {
        userId: currentUser.id,
        collectionId,
        createdOn: new Date(),
      });
    } catch (error) {
      console.error("Error accepting collection request:", error);
      throw error;
    }
  };

  const denyCollectionRequest = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(firestore, "Notification", id));
      console.log(`Notification ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  const value: CollectionContextProps = {
    createCollection,
    getCollections,
    renameCollection,
    deleteCollection,
    updateCollectionHeaders,
    shareCollection,
    acceptCollectionRequest,
    denyCollectionRequest,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

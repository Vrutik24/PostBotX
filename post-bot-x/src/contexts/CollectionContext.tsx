import React, { createContext, useContext, ReactNode } from "react";
import {
  addDoc,
  doc,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "@firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "../firebase";
import generateUniqueId from "./GenerateUniqueId";
import {
  Collection,
  CreateAPI,
  Header,
  Notification,
} from "../types";

interface CollectionContextProps {
  createCollection: (name: string) => Promise<Collection>;
  getCollections: () => Promise<Collection[] | null>;
  getCollectionById: (id: string) => Promise<Collection | undefined>;
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
    const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
    if (existingAnonymousUserId) {
      return existingAnonymousUserId;
    } else {
      const anonymousUserId = generateUniqueId();
      localStorage.setItem("anonymousUserId", anonymousUserId);
      return anonymousUserId;
    }
  };

  const getCollectionById = async (
    id: string
  ): Promise<Collection | undefined> => {
    const docRef = doc(firestore, "Collection", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Collection;
    }
  };

  const createCollection = async (name: string): Promise<Collection> => {
    const collectionId = generateUniqueId();
    const anonymousUserId = createAnonymousUser();

    let userId = anonymousUserId;
    if (currentUser) {
      const user = await getUserByEmailAsync(currentUser.email);
      if (user) {
        userId = user.id;
      }
    }

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
    
    const collectionSnapshot = await getDocs(
      collection(firestore, "Collection")
    );
    let createdCollection: Collection | null = null;
    collectionSnapshot.forEach((doc) => {
      if (doc.data().collectionId === collectionId) {
        createdCollection = { id: doc.id, ...doc.data() } as Collection;
      }
    });

    if (!createdCollection) {
      throw new Error("Failed to retrieve the newly created collection.");
    }

    return createdCollection;
  };

  const getCollections = async (): Promise<Collection[] | null> => {
    try {
      const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
      let userId = existingAnonymousUserId;
      if (currentUser) {
        const user = await getUserByEmailAsync(currentUser.email);
        if (user) {
          userId = user.id;
        }
      }

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
              id: doc.id,
              name: data.name,
              createdById: data.createdById,
              createdOn: data.createdOn.toDate(),
              collectionId: data.collectionId,
              headers: data.headers as Header[],
            } as Collection;
          }
        );
        collections.sort(
          (a, b) => a.createdOn.getTime() - b.createdOn.getTime()
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

        const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
        let userId = existingAnonymousUserId;
        if (currentUser) {
          const user = await getUserByEmailAsync(currentUser.email);
          if (user) {
            userId = user.id;
          }
        }

        await updateDoc(collectionDocRef, {
          name: newName,
          updatedById: userId,
          updatedOn: new Date(),
        });
      } else {
        console.error(`Collection with ID ${collectionId} not found`);
      }
    } catch (err: any) {
      throw new Error(`Failed to rename collection: ${err.message}`);
    }
  };

  const deleteCollection = async (collectionId: string): Promise<void> => {
    try {
      const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
      let userId = existingAnonymousUserId;
      if (currentUser) {
        const user = await getUserByEmailAsync(currentUser.email);
        if (user) {
          userId = user.id;
        }
      }

      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", userId),
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

        const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
        let userId = existingAnonymousUserId;
        if (currentUser) {
          const user = await getUserByEmailAsync(currentUser.email);
          if (user) {
            userId = user.id;
          }
        }

        await updateDoc(collectionDocRef, {
          headers: newHeaders,
          updatedById: userId,
          updatedOn: new Date(),
        });
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
        where("userEmail", "==", userEmail),
        where("collectionId", "==", collectionId)
      );

      const notificationsSnapshot = await getDocs(notificationQuery);

      if (!notificationsSnapshot.empty) {
        throw new Error(`Collection is already shared with ${userEmail}`);
      }

      const receivingUserId = receivingUserRecord.id;
      const userCollectionQuery = query(
        collection(firestore, "UserCollection"),
        where("userId", "==", receivingUserId),
        where("collectionId", "==", collectionId)
      );

      const userCollectionSnapshot = await getDocs(userCollectionQuery);

      if (!userCollectionSnapshot.empty) {
        throw new Error(
          `User with ${userEmail} already has the ${collectionName} collection`
        );
      }

      const notification: Notification = {
        userEmail,
        userId: receivingUserId,
        createdOn: new Date(),
        collectionId,
        collectionName,
        senderName: currentUser?.displayName,
      };

      await addDoc(collection(firestore, "Notification"), notification);
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
      const user = await getUserByEmailAsync(currentUser.email);
      await addDoc(collection(firestore, "UserCollection"), {
        userId: user?.id,
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
    getCollectionById,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

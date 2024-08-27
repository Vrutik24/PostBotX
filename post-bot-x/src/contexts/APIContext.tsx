import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  QuerySnapshot,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import { API } from "../types";

interface APIContextProps {
  createAPI: (apiDetail: API, collectionId: string) => Promise<string>;
  updateAPI: (
    id: string,
    apiDetail: API,
    collectionId: string
  ) => Promise<void>;
  getApisByCollectionId: (
    collectionId: string
  ) => Promise<QuerySnapshot<API> | null>;
  getApiById: (id: string) => Promise<API | undefined>;
  deleteApiById: (id: string) => Promise<void>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIContextProvider");
  }
  return context;
}

interface APIContextProviderProps {
  children: ReactNode;
}

export const APIContextProvider: React.FC<APIContextProviderProps> = ({
  children,
}) => {
  const { currentUser } = useAuth();

  const createAPI = async (
    apiDetail: API,
    collectionId: string
  ): Promise<string> => {
    const existingAnonymousUser = localStorage.getItem("anonymousUserId");
    const userId = currentUser?.id || existingAnonymousUser;
    const newAPIObj: API = {
      ...apiDetail,
      collectionId,
      createdById: userId,
      createdOn: new Date(),
    };

    try {
      const docRef = await addDoc(collection(firestore, "API"), newAPIObj);
      return docRef.id;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const updateAPI = async (
    id: string,
    apiDetail: API,
    collectionId: string
  ): Promise<void> => {
    const existingAnonymousUser = localStorage.getItem("anonymousUserId");
    const userId = currentUser?.id || existingAnonymousUser;
    const updatedAPIObj: API = {
      ...apiDetail,
      collectionId,
      updatedById: userId,
      updatedOn: new Date(),
    };

    try {
      await setDoc(doc(firestore, "API", id), updatedAPIObj);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getApisByCollectionId = async (
    collectionId: string
  ): Promise<QuerySnapshot<API> | null> => {
    try {
      if (collectionId) {
        const apiCollectionQuery = query(
          collection(firestore, "API"),
          where("collectionId", "==", collectionId)
        );
        const apiCollections = await getDocs(apiCollectionQuery);
        return apiCollections as QuerySnapshot<API>;
      }
      return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getApiById = async (id: string): Promise<API | undefined> => {
    const docRef = doc(firestore, "API", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as API;
    }
  };

  const deleteApiById = async (id: string): Promise<void> => {
    await deleteDoc(doc(firestore, "API", id));
  };

  const value: APIContextProps = {
    createAPI,
    updateAPI,
    getApisByCollectionId,
    getApiById,
    deleteApiById,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

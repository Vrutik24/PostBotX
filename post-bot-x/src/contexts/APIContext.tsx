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
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { firestore } from "../firebase";

interface APIContextProps {
  createAPI: (
    apiDetail: DocumentData,
    apiType: string,
    collectionId: string
  ) => Promise<string>;
  updateAPI: (
    apiId: string,
    apiDetail: DocumentData,
    apiType: string,
    collectionId: string
  ) => Promise<void>;
  getApisByCollectionId: (
    collectionId: string
  ) => Promise<QuerySnapshot<DocumentData> | null>;
  getApiById: (id: string) => Promise<DocumentData | undefined>;
  deleteApiById: (id: string) => Promise<void>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error(
      "useAPI must be used within an APICollectionContextProvider"
    );
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
    apiDetail: DocumentData,
    apiType: string,
    collectionId: string
  ): Promise<string> => {
    const newAPIObj = {
      ...apiDetail,
      apiType,
      collectionId,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
    };

    try {
      const docRef = await addDoc(
        collection(firestore, "ApiCollection"),
        newAPIObj
      );
      return docRef.id;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const updateAPI = async (
    apiId: string,
    apiDetail: DocumentData,
    apiType: string,
    collectionId: string
  ): Promise<void> => {
    const newAPIObj = {
      ...apiDetail,
      apiType,
      collectionId,
      createdBy: currentUser?.displayName,
      createdById: currentUser?.uid,
      createdOn: new Date(),
    };

    try {
      await setDoc(doc(firestore, "ApiCollection", apiId), newAPIObj);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getApisByCollectionId = async (
    collectionId: string
  ): Promise<QuerySnapshot<DocumentData> | null> => {
    try {
      if (collectionId) {
        const apiCollectionQuery = query(
          collection(firestore, "ApiCollection"),
          where("collectionId", "==", collectionId)
        );
        const apiCollections = await getDocs(apiCollectionQuery);
        return apiCollections;
      }
      return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getApiById = async (id: string): Promise<DocumentData | undefined> => {
    const docRef = doc(firestore, "ApiCollection", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  const deleteApiById = async (id: string): Promise<void> => {
    await deleteDoc(doc(firestore, "ApiCollection", id));
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

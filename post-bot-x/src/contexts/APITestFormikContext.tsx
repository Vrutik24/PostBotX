import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useFormik, FormikProps } from "formik";
import { API, Collection, CollectionWithAPIRequests, Header } from "../types";
import { QueryParameter } from "../types/QueryParameter";
import * as Yup from "yup";
import { useAPI } from "./APIContext";
import { useCollection } from "./CollectionContext";

interface FormValues {
  apiType: string;
  url: string;
  payload: string[];
  manualPayload: string[];
  configuredPayload: string;
  headers: Header[];
  queryParameters: QueryParameter[];
  manualQueryParameters: QueryParameter[];
}

interface FormikContextType {
  formik: FormikProps<FormValues>;
  testingMethod: "Automated" | "Manual";
  setTestingMethod: (method: "Automated" | "Manual") => void;
  setSelectedAPIId: (apiId: string) => void;
  setCurrentCollectionId: (collectionId: string) => void;
  apiRequestData?: API;
  selectedAPIId?: string;
  currentCollection?: Collection;
  setCurrentCollection: (collection: Collection) => void;
  apiName?: string;
  setAPIName: (apiName?: string) => void;
  fetchCollections: () => void;
  fetchRequestsForCollections: () => void;
  collections: Collection[];
  collectionsWithRequests: CollectionWithAPIRequests[];
  loadingAPIData: boolean;
}
// Created a context
export const APITestFormikContext = createContext<FormikContextType | null>(
  null
);

// Created a Provider
const APITestFormikProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getApiById, getApisByCollectionId } = useAPI();
  const [testingMethod, setTestingMethod] = useState<"Automated" | "Manual">(
    "Automated"
  );
  const [selectedAPIId, setSelectedAPIId] = useState<string>();
  const [currentCollectionId, setCurrentCollectionId] = useState<string>();
  const [apiRequestData, setAPIRequestData] = useState<API | undefined>();
  const [currentCollection, setCurrentCollection] = useState<Collection>();
  const [apiName, setAPIName] = useState<string | undefined>("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsWithRequests, setCollectionsWithRequests] = useState<
    CollectionWithAPIRequests[]
  >([]);
  const [loadingAPIData, setLodingAPIData] = useState<boolean>(false);
  // const [apiRequestTypeName, setAPIRequestTypeName] = useState<string>('');
  const { getCollectionById, getCollections } = useCollection();

  const fetchCollections = async () => {
    try {
      const collectionList = await getCollections();
      collectionList ? setCollections(collectionList) : setCollections([]);
      if(!collectionList || collectionList.length==0)
      {
        setCurrentCollection(undefined);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const getAPISByCollectionIdRequest = async (collectionId: string) => {
    try {
      const collectionAPIs = await getApisByCollectionId(collectionId);
      return collectionAPIs;
    } catch (error) {
      console.error("Failed to get APIs of this collection", error);
    }
  };

  const fetchRequestsForCollections = async () => {
    const updatedCollections = await Promise.all(
      collections.map(async (collection: Collection) => {
        const apiRequests = await getAPISByCollectionIdRequest(
          collection.collectionId
        );
        return { ...collection, apiRequests };
      })
    );
    setCollectionsWithRequests([...updatedCollections]);
  };

  const getCollection = async (id: string) => {
    try {
      const collectionData: Collection | undefined = await getCollectionById(
        id
      );
      if (collectionData) {
        setCurrentCollection(collectionData);
      }
    } catch (error) {
      console.error("Could not fetch collection!");
    }
  };

  useEffect(() => {
    if (currentCollectionId) {
      getCollection(currentCollectionId);
    }
  }, [currentCollectionId]);

  const fetchAPIById = async (id: string) => {
    setLodingAPIData(true);
    try {
      const apiData: API | undefined = await getApiById(id);
      if (apiData) {
        setAPIName(apiData.name ? apiData.name : "untitled");
        setLodingAPIData(false);
        setAPIRequestData(apiData);
        setTestingMethod(apiData.isAutomated ? "Automated" : "Manual");
        formik.setValues({
          apiType: apiData.apiType || "Get",
          url: apiData.url || "",
          payload: apiData.isAutomated
            ? apiData.payload
              ? apiData.payload
              : [""]
            : [""],
          manualPayload: !apiData.isAutomated
            ? apiData.payload
              ? apiData.payload
              : [""]
            : [""],
          configuredPayload: apiData.isAutomated
            ? apiData.configuredPayload
              ? apiData.configuredPayload
              : ""
            : "",
          headers: apiData.headers
            ? apiData.headers
            : [
                {
                  key: "",
                  value: "",
                  isChecked: false,
                },
              ],
          queryParameters: apiData.isAutomated
            ? apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                    isChecked: false,
                  },
                ]
            : [
                {
                  key: "",
                  value: [""],
                  isChecked: false,
                },
              ],
          manualQueryParameters: !apiData.isAutomated
            ? apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                    isChecked: false,
                  },
                ]
            : [
                {
                  key: "",
                  value: [""],
                  isChecked: false,
                },
              ],
        });
      }
    } catch (error) {
      console.error("Could not fetch API", error);
    } finally {
      setLodingAPIData(false);
    }
  };

  useEffect(() => {
    if (selectedAPIId) {
      fetchAPIById(selectedAPIId);
    }
  }, [selectedAPIId]);

  const formikInitialValues: FormValues = {
    apiType: "Get",
    url: "",
    payload: [""],
    manualPayload: [""],
    configuredPayload: "",
    headers: [
      {
        key: "",
        value: "",
        isChecked: false,
      },
    ],
    queryParameters: [
      {
        key: "",
        value: [""],
        isChecked: false,
      },
    ],
    manualQueryParameters: [
      {
        key: "",
        value: [""],
        isChecked: false,
      },
    ],
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    onSubmit: (values) => {},
    // validationSchema:
  });
  return (
    <APITestFormikContext.Provider
      value={{
        formik,
        testingMethod,
        setTestingMethod,
        setSelectedAPIId,
        setCurrentCollectionId,
        apiRequestData,
        selectedAPIId,
        currentCollection,
        setCurrentCollection,
        apiName,
        setAPIName,
        fetchCollections,
        fetchRequestsForCollections,
        collections,
        collectionsWithRequests,
        loadingAPIData,
      }}
    >
      {children}
    </APITestFormikContext.Provider>
  );
};

// Custom hook to use the formik context

const useAPITestFormikContext = () => {
  const context = useContext(APITestFormikContext);
  if (!context) {
    throw new Error("useFormikContext must be used within a FormikProvider");
  }
  return context;
};

export { APITestFormikProvider, useAPITestFormikContext };

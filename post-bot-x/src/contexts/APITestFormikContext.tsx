import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useFormik, FormikProps } from "formik";
import { API, Collection, Header } from "../types";
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
  apiRequestData: API | undefined;
  selectedAPIId: string | undefined;
  collectionName: string;
  // apiName: string;
  // apiRequestTypeName: string;
  // setAPIName: (apiName: string) => void;
  // setAPIRequestTypeName: (apiRequestTypeName: string) => void;
}
// Created a context
export const APITestFormikContext = createContext<FormikContextType | null>(
  null
);

// Created a Provider
const APITestFormikProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getApiById } = useAPI();
  const [testingMethod, setTestingMethod] = useState<"Automated" | "Manual">(
    "Automated"
  );
  const [selectedAPIId, setSelectedAPIId] = useState<string>();
  const [currentCollectionId, setCurrentCollectionId] = useState<string>();
  const [apiRequestData, setAPIRequestData] = useState<API | undefined>();
  const [collectionName, setCollectionName] = useState("Collection");
  // const [apiName, setAPIName] = useState<string>("untitled");
  // const [apiRequestTypeName, setAPIRequestTypeName] = useState<string>('');
  const { getCollectionById } = useCollection();
  
  console.log("currentCollectionId", currentCollectionId)

  const getCollection = async (id: string) => {
    try {
      const collectionData: Collection | undefined = await getCollectionById(id);
      console.log("collectionData", collectionData)
      if(collectionData)
      {
        setCollectionName(collectionData.name)
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
    try {
      const apiData: API | undefined = await getApiById(id);
      console.log("apiData", apiData);
      if (apiData) {
        // setAPIRequestTypeName(apiData.apiType)
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
                },
              ],
          queryParameters: apiData.isAutomated
            ? apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                  },
                ]
            : [
                {
                  key: "",
                  value: [""],
                },
              ],
          manualQueryParameters: !apiData.isAutomated
            ? apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                  },
                ]
            : [
                {
                  key: "",
                  value: [""],
                },
              ],
        });
      }
    } catch (error) {
      console.error("Could not fetch API", error);
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
      },
    ],
    queryParameters: [
      {
        key: "",
        value: [""],
      },
    ],
    manualQueryParameters: [
      {
        key: "",
        value: [""],
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
        collectionName,
        // apiName,
        // setAPIName,
        // apiRequestTypeName,
        // setAPIRequestTypeName
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

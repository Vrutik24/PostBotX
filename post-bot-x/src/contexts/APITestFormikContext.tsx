import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useFormik, FormikProps } from "formik";
import { API, Header } from "../types";
import { QueryParameter } from "../types/QueryParameter";
import * as Yup from "yup";
import { useAPI } from "./APIContext";

interface FormValues {
  apiType: string;
  url: string;
  payload: string[];
  headers: Header[];
  queryParameters: QueryParameter[];
  manualQueryParameters: QueryParameter[];
}

interface FormikContextType {
  formik: FormikProps<FormValues>;
  testingMethod: "Automated" | "Manual";
  setTestingMethod: (method: "Automated" | "Manual") => void;
  setSelectedAPIId: (apiId: string) => void;
  apiRequestData: API | undefined;
  selectedAPIId: string | undefined;
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
  const [apiRequestData, setAPIRequestData] = useState<API|undefined>()

  const fetchAPIById = async (id: string) => {
    try {
      const apiData: API | undefined = await getApiById(id);
      console.log("apiData", apiData)
      if (apiData) {
        setAPIRequestData(apiData)
        formik.setValues({
          apiType: apiData.apiType || "Get",
          url: apiData.url || "",
          payload: apiData.isAutomated
            ? apiData.payload
              ? apiData.payload
              : [""]
            : apiData.payload
            ? apiData.payload
            : [""],
          headers: apiData.headers
            ? apiData.headers
            : [
                {
                  key: "",
                  value: "",
                },
              ],
          queryParameters: apiData.isAutomated
            ? (apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                  },
                ])
            : [
                {
                  key: "",
                  value: [""],
                },
              ],
          manualQueryParameters: !apiData.isAutomated
            ? (apiData.queryParameters
              ? apiData.queryParameters
              : [
                  {
                    key: "",
                    value: [""],
                  },
                ])
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

  const formikInitialValues = {
    apiType: "Get",
    url: "",
    payload: [""],
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
    onSubmit: (values) => {
    },
    // validationSchema:
  });
  return (
    <APITestFormikContext.Provider
      value={{ formik, testingMethod, setTestingMethod, setSelectedAPIId, apiRequestData, selectedAPIId }}
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

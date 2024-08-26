import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  useFormik,
  FormikConfig,
  FormikHelpers,
  FormikContext,
  FormikProps,
} from "formik";
import * as Yup from "yup";

interface FormValues {
  apiType: string;
  url: string;
  payload: string[];
  headerPairs: {
    key: string;
    value: string;
  }[];
  queryParameters: {
    key: string;
    value: string | string;
  }[];
  manualQueryParameters: {
    key: string;
    value: string[];
  }[];
}

interface FormikContextType {
  formik: FormikProps<FormValues>;
  testingMethod: "Automated" | "Manual";
  setTestingMethod: (method: "Automated" | "Manual") => void;
}
// Created a context
export const APITestFormikContext = createContext<FormikContextType | null>(
  null
);

// Created a Provider
const APITestFormikProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [testingMethod, setTestingMethod] = useState<"Automated" | "Manual">(
    "Automated"
  );
  const formikInitialValues = {
    apiType: "Get",
    url: "",
    payload: [""],
    headerPairs: [
      {
        key: "",
        value: "",
      },
    ],
    queryParameters: [
      {
        key: "",
        value: "",
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
      console.log("Values", values);
      const apiPayload = {
        apiType: values.apiType,
        url: values.url,
        payload: values.payload,
        queryParameters: testingMethod === "Automated" ? [values.queryParameters] : values.manualQueryParameters,
        headerPairs: values.headerPairs
      }
      console.log("apiPayload", apiPayload)
    },
    // validationSchema:
  });
  return (
    <APITestFormikContext.Provider
      value={{ formik, testingMethod, setTestingMethod }}
    >
      {children}
    </APITestFormikContext.Provider>
  );
};

// Custom hook to use the formik context

const useAPITestFormikContext = () => {
  const context = useContext(APITestFormikContext);
  console.log("context", context);
  if (!context) {
    throw new Error("useFormikContext must be used within a FormikProvider");
  }
  return context;
};

export { APITestFormikProvider, useAPITestFormikContext };

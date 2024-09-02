import React, { createContext, useContext, ReactNode, useState } from "react";
import { useFormik, FormikProps } from "formik";
import { Header } from "../types";
import { QueryParameter } from "../types/QueryParameter";
import * as Yup from "yup";

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
      console.log("Values", values);
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
  if (!context) {
    throw new Error("useFormikContext must be used within a FormikProvider");
  }
  return context;
};

export { APITestFormikProvider, useAPITestFormikContext };

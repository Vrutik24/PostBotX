import React, { createContext, useContext, ReactNode } from "react";
import { useFormik, FormikConfig, FormikHelpers, FormikContext, FormikProps } from "formik";
import * as Yup from "yup";

interface FormValues {
    apiType: string,
    url: string,
    payload: string,
    headerPairs: {
        key: string,
        value: string
    }[],
    queryParameters: 
      {
        key: string,
        value: string,
      }[]
    
}

interface FormikContextType {
    formik: FormikProps<FormValues> | null;
  }
// Created a context
export const APITestFormikContext = createContext<FormikContextType | null>(null);

// Created a Provider
const APITestFormikProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const formikInitialValues = {
    apiType: "Get",
    url: "",
    payload: "",
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
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      console.log("Values", values);
    },
    // validationSchema:
  });
  return (
    <FormikContext.Provider value={formik}>{children}</FormikContext.Provider>
  );
};

// Custom hook to use the formik context

const useFormikContext = () => {
  const context = useContext(APITestFormikContext);
  console.log("context", context);
  if (!context) {
    throw new Error("useFormikContext must be used within a FormikProvider");
  }
  return context;
};

export { APITestFormikProvider, useFormikContext };

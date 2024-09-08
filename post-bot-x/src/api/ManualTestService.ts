import { APIRequestPayload } from "../types/APIRequestPayload";
import apiClient from "./axios";
import { CancelToken } from "axios";
import CallSnackbar from "../contexts/CallSnackbar";

export const useManualAPICalls = () => {
  const snackbar = CallSnackbar();

  const manualTestWrite = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const response = await apiClient.post("manual/write", payload, {
        cancelToken,
      });
      return response.data;
    } catch (error : any) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        const firstErrorKey = Object.keys(errors)[0]; 
        const firstError = errors[firstErrorKey]?.[0]; 
  
        if (firstError) {
          snackbar.error(firstError); 
        }
        } else {
        snackbar.error(error?.message); 
        }
      throw error;
    }
  };

  const manualTestRead = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const response = await apiClient.post("manual/read", payload, {
        cancelToken,
      });
      return response.data;
    } catch (error : any) {
      const errors = error?.response?.data?.errors;
      if (errors ) {
        const firstErrorKey = Object.keys(errors)[0]; 
        const firstError = errors[firstErrorKey]?.[0]; 
  
        if (firstError) {
          snackbar.error(firstError); 
        }
        } else {
        snackbar.error(error?.message); 
        }
      throw error;
    }
  };

  const manualPostWrite = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const data = await manualTestWrite(payload, cancelToken);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const manualPostRead = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const data = await manualTestRead(payload, cancelToken);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { manualTestWrite, manualTestRead, manualPostWrite, manualPostRead };
};

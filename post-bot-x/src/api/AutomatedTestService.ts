import apiClient from "./axios";
import { APIRequestPayload } from "../types/APIRequestPayload";
import { CancelToken } from "axios";
import CallSnackbar from "../contexts/CallSnackbar";

export const useAutomatedAPICalls = () => {
  const snackbar = CallSnackbar();

  const automatedTestWrite = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const response = await apiClient.post("automated/write", payload, {
        cancelToken,
      });
      return response.data;
    } catch (error: any) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const firstErrorKey = Object.keys(errors)[0];
        const firstError = errors[firstErrorKey]?.[0];

        if (firstError) {
          snackbar.error(firstError);
        }
        }else {
        snackbar.error(error?.message);
        }
      throw error;
    }
  };

  const automatedTestRead = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const response = await apiClient.post("automated/read", payload, {
        cancelToken,
      });
      return response.data;
    } catch (error: any) {
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

  const automatedPostWrite = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const data = await automatedTestWrite(payload, cancelToken);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  const automatedPostRead = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const data = await automatedTestRead(payload, cancelToken);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    automatedTestWrite,
    automatedTestRead,
    automatedPostWrite,
    automatedPostRead,
  };
};

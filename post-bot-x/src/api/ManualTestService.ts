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
    } catch (error) {
      console.error("Error occurred while processing the request:", error);
      snackbar.error("Error occurred while processing the request");
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
    } catch (error) {
      console.error("Error occurred while processing the request:", error);
      snackbar.error("Error occurred while processing the request");
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
      console.error("Error occurred while processing the request:", error);
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
      console.error("Error occurred while processing the request:", error);
    }
  };

  return { manualTestWrite, manualTestRead, manualPostWrite, manualPostRead };
};

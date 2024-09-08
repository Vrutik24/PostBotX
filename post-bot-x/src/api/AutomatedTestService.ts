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
    } catch (error) {
      console.error("Error occurred while processing the request!");
      snackbar.error("Error occurred while processing the request");
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
    } catch (error) {
      console.error("Error occurred while processing the request!");
      snackbar.error("Error occurred while processing the request");
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
    } catch (error) {
      console.error("Error occurred while processing the request", error);
    }
  };

  const automatedPostRead = async (
    payload: APIRequestPayload,
    cancelToken: CancelToken
  ) => {
    try {
      const data = await automatedTestRead(payload, cancelToken);
      return data;
    } catch (error) {
      console.error("Error occurred while processing the request", error);
    }
  };

  return {
    automatedTestWrite,
    automatedTestRead,
    automatedPostWrite,
    automatedPostRead,
  };
};

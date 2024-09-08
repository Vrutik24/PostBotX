import { APIRequestPayload } from "../types/APIRequestPayload";
import apiClient from "./axios";
import { CancelToken } from "axios";
import CallSnackbar from "../utils/Callsnackbar";

export const manualTestWrite = async (
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
    CallSnackbar.error("Error occurred while processing the request");
    throw error;
  }
};

export const manualTestRead = async (
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
    CallSnackbar.error("Error occurred while processing the request");
    throw error;
  }
};

export const manualPostWrite = async (
  payload: APIRequestPayload,
  cancelToken: CancelToken
) => {
  try {
    const data = await manualTestWrite(payload, cancelToken);
    return data;
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    CallSnackbar.error("Error occurred while processing the request");
  }
};

export const manualPostRead = async (
  payload: APIRequestPayload,
  cancelToken: CancelToken
) => {
  try {
    const data = await manualTestRead(payload, cancelToken);
    return data;
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    CallSnackbar.error("Error occurred while processing the request");
  }
};

import apiClient from "./axios";
import { APIRequestPayload } from "../types/APIRequestPayload";
import { CancelToken } from "axios";
import CallSnackbar from "../utils/Callsnackbar";

export const automatedTestWrite = async (
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
    CallSnackbar.error("Error occurred while processing the request");
    throw error;
  }
};

export const automatedTestRead = async (
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
    CallSnackbar.error("Error occurred while processing the request");
    throw error;
  }
};

export const automatedPostWrite = async (
  payload: APIRequestPayload,
  cancelToken: CancelToken
) => {
  try {
    const data = await automatedTestWrite(payload, cancelToken);
    return data;
  } catch (error) {
    console.error("Error occurred while processing the request", error);
    CallSnackbar.error("Error occurred while processing the request")
  }
};

export const automatedPostRead = async (
  payload: APIRequestPayload,
  cancelToken: CancelToken
) => {
  try {
    const data = await automatedTestRead(payload, cancelToken);
    return data;
  } catch (error) {
    console.error("Error occurred while processing the request", error);
    CallSnackbar.error("Error occurred while processing the request")
  }
};

import { APIRequestPayload } from "../types/APIRequestPayload";
import apiClient from "./axios";

export const manualTestWrite = async (payload: APIRequestPayload) => {
    try {
        const response = await apiClient.post('manual/write', payload)
        return response.data
    }
    catch (error)
    {
        console.error('Error occurred while processing the request!');
        throw error
    }
}

export const manualTestRead = async (payload: APIRequestPayload) => {
    try
    {
        const response = await apiClient.post('manual/read', payload)
        return response.data
    }
    catch (error)
    {
        console.error("Error occurred while processing the request!")
        throw error
    }
}

export const manualPostWrite = async (payload: APIRequestPayload) => {
    try {
      const data = await manualTestWrite(payload);
      return data;
    } catch (error) {
      console.error("Error occurred while processing the request!");
    }
  };

export const manualPostRead = async (payload: APIRequestPayload) => {
    try {
      const data = await manualTestRead(payload);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
import apiClient from "./axios";
import { APIRequestPayload } from "../types/APIRequestPayload";

export const automatedTestWrite = async (payload: APIRequestPayload) => {
    try {
        const response = await apiClient.post('automated/write', payload)
        return response.data
    }
    catch (error)
    {
        console.error('Error occurred while processing the request!');
        throw error
    }
}

export const automatedTestRead = async (payload: APIRequestPayload) => {
    try
    {
        const response = await apiClient.post('automated/read', payload)
        return response.data
    }
    catch (error)
    {
        console.error("Error occurred while processing the request!")
        throw error
    }
}

export const automatedPostWrite = async (payload: APIRequestPayload) => {
    try {
      const data = await automatedTestWrite(payload);
      return data;
    } catch (error) {
      console.error("Error occurred while processing the request", error);
    }
  };

export  const automatedPostRead = async (payload: APIRequestPayload) => {
    try {
      const data = await automatedTestRead(payload);
      return data;
    } catch (error) {
      console.error("Error occurred while processing the request", error);
    }
  };
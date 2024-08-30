import { Header } from "./Header";
import { QueryParameter } from "./QueryParameter";

export interface API {
  id: string;
  name: string;
  createdById: string;
  updatedById: string;
  createdOn: Date;
  updatedOn: Date;
  collectionId: string;
  apiType: string;
  isAutomated: boolean;
  url: string;
  configuredPayload?: string;
  payload?: string[];
  headers?: Header[];
  queryParameters?: QueryParameter[];
}

export interface CreateAPI {
  collectionId: string;
  apiType: string;
  isAutomated: boolean;
  url: string;
  configuredPayload?: string;
  payload?: string[];
  headers?: Header[];
  queryParameters?: QueryParameter[];
  createdOn: Date;
  createdById: string;
}

export interface CreateAPIDetail {
  apiType: string;
  isAutomated: boolean;
  url: string;
  configuredPayload?: string;
  payload?: string[];
  headers?: Header[];
  queryParameters?: QueryParameter[];
}

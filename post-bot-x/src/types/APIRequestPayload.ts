import { Header } from "./Header";
import { QueryParameter } from "./QueryParameter";

export interface APIRequestPayload {
  apiType: string;
  isAutomated: boolean;
  url: string;
  payload: string[] | null;
  headers: Header[];
  queryParameters: QueryParameter[];
}

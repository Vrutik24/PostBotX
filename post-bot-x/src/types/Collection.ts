import { Header } from "./Header";
import { API } from "./API";

export interface Collection {
  id?: string;
  name: string;
  createdById: string;
  updatedById: string;
  createdOn: Date;
  updatedOn: Date;
  collectionId: string;
  headers: Header[];
}

export interface CollectionWithAPIRequests {
  id?: string;
  name: string;
  createdById: string;
  updatedById: string;
  createdOn: Date;
  updatedOn: Date;
  collectionId: string;
  headers: Header[];
  apiRequests: API[] | null | undefined;
}

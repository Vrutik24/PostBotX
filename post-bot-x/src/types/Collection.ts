import { Header } from "./Header";

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

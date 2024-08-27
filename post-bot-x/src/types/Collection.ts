import {Header} from "./Header";

  
export interface Collection {
    name: string;
    createdById: string;
    createdOn: Date;
    collectionId: string;
    headers: Header[];
}
import {Header} from "./Header";

  
export interface Collection {
    name: string;
    createdById: string;
    updatedById : string;
    createdOn: Date;
    updatedOn: Date;
    collectionId: string;
    headers: Header[];
}
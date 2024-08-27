import {Header} from "./Header";

export interface API {
    id:               string;
    name:             string;
    createdById:      string; 
    updatedById :     string;
    createdOn:        Date;
    updatedOn:        Date;
    collectionId:     string;
    apiType:          string;
    isAutomated:      boolean;
    url:              string;
    configuredPayload?:string;
    payload?:          string[];
    headers?:          Header[];
    queryParameters?:  QueryParameter[];
}
 
export interface QueryParameter {
    key:    string;
    values: string[];
}
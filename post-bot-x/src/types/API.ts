import {Header} from "./Header";

export interface API {
    name:             string;
    createdById:      string;
    createdOn:        Date;
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
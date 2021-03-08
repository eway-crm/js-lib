import { IApiResult } from "./IApiResult";

export interface IApiDataResponse<T> extends IApiResult {
    Data: T[];
}
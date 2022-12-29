import { IApiResult } from "./IApiResult";

export interface IApiBooleanResponse<T> extends IApiResult {
    Result: boolean;
}
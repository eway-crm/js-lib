import { IApiResult } from "./IApiResult";

export interface IApiDatumResponse<T> extends IApiResult {
    Datum: T;
}
import type { ImportResult } from "../constants/ImportResult";
import type { IApiDataResponse } from "./IApiDataResponse";

export interface IApiDataImportResponse<T> extends IApiDataResponse<T> {
    ImportResult: ImportResult;
}
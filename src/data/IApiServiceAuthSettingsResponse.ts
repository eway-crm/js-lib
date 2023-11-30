import { IApiResult } from "./IApiResult";

export interface IApiAvailableVersionResponse extends IApiResult {
    IsActiveDirectory: boolean;
    IsAzureAuth: boolean;
}
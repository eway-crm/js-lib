import type { IApiResult } from "./IApiResult";

export interface IApiServiceAuthSettingsResponse extends IApiResult {
    IsActiveDirectory: boolean;
    IsAzureAuth: boolean;
}
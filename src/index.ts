import * as Promise from 'es6-promise';
import { ApiConnection } from './ApiConnection';
import { HttpMethod } from './HttpMethod';
import { ISessionHandler } from './ISessionHandler';
import { ReturnCodes } from './ReturnCodes';
import { ITokenizedApiResult } from './tokenizedServices/ITokenizedApiResult';
import { TokenizedServiceConnection } from './tokenizedServices/TokenizedServiceConnection';
import { CommonDataConnection } from './tokenizedServices/CommonDataConnection';
import { ApiMethods } from './ApiMethods';
import GlobalSettingsNames from './constants/GlobalSettingsNames';
import FieldNames from './constants/FieldNames';
import { FolderNames, TFolderName } from './constants/FolderNames';
import { OAuthHelper } from './helpers/OAuthHelper';
import { HttpRequestError, TUnionError } from './exceptions/HttpRequestError';
import { TInputData } from './interfaces/ITokenData';
import EnumTypes from './constants/EnumTypes'; 

Promise.polyfill();

export default ApiConnection;

export * from './data/EWItem';
export * from './data/IApiAdditionalField';
export * from './data/IApiAvailableBundle';
export * from './data/IApiAvailableVersionResponse';
export * from './data/IApiCapacityAvailableBundle';
export * from './data/IApiColumn';
export * from './data/IApiColumnPermission';
export * from './data/IApiDataResponse';
export * from './data/IApiDatumResponse';
export * from './data/IApiContact';
export * from './data/IApiCompany';
export * from './data/IApiEnumType';
export * from './data/IApiEnumValue';
export * from './data/IApiFeature';
export * from './data/IApiGlobalSetting';
export * from './data/IApiGroup';
export * from './data/IApiItemBase';
export * from './data/IApiItemUsageStatus';
export * from './data/IApiLead';
export * from './data/IApiLicense';
export * from './data/IApiLicenseBundleBase';
export * from './data/IApiLocalizedLicenseBundle';
export * from './data/IApiModulePermission';
export * from './data/IApiObjectType';
export * from './data/IApiPasswordStrength';
export * from './data/IApiResult';
export * from './data/IApiSaveResponse';
export * from './data/IApiUser';
export * from './data/IApiUserSetting';
export * from './data/IApiWorkflowModel';

export * from './interfaces/ITranslatableString';

export {
    HttpMethod,
    ISessionHandler,
    ReturnCodes,
    ITokenizedApiResult,
    TokenizedServiceConnection,
    CommonDataConnection,
    ApiMethods,
    GlobalSettingsNames,
    FolderNames,
    TFolderName,
    OAuthHelper,
    HttpRequestError,
    TUnionError,
    TInputData,
    FieldNames,
    EnumTypes
};

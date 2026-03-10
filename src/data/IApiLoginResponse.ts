import type { IApiResult } from './IApiResult';

export interface IApiLoginResponse extends IApiResult {
    SessionId: string | null;
    UserItemGuid: string | null;
    IsAdmin: boolean | null;
    WcfVersion: string;
    OutlookClientVersion: string;
    EwayToken: string | null;
    Debug?: boolean;
}

import { ApiConnection } from './ApiConnection';
import { IApiResult } from './data/IApiResult';

export type TLoginResponse = IApiResult & {
    SessionId: string | null;
    UserItemGuid: string | null;
    IsAdmin: boolean | null;
    WcfVersion: string;
};

export interface ISessionHandler {
    invalidateSessionId(sessionId: string, callback: () => void): void;
    getSessionId(connection: ApiConnection, callback: (sessionId: string) => void): void;
    loginResponse?: TLoginResponse; 
}

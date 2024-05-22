import type { ApiConnection } from './ApiConnection';
import type { IApiLoginResponse } from './data/IApiLoginResponse';

export interface ISessionHandler {
    invalidateSessionId(sessionId: string, callback: () => void): void;
    getSessionId(connection: ApiConnection, callback: (sessionId: string) => void): void;
    lastSuccessfulLoginResponse?: IApiLoginResponse; 
}

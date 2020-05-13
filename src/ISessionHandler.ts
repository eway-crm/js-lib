import { ApiConnection } from './ApiConnection';

export interface ISessionHandler {
    invalidateSessionId(sessionId: string, callback: () => void): void;
    getSessionId(connection: ApiConnection, callback: (sessionId: string) => void): void;
}

import { ISessionHandler } from './ISessionHandler';

export class AnonymousSessionHandler implements ISessionHandler {
    readonly getSessionId = (connection: import('./ApiConnection').ApiConnection, callback: (sessionId: string) => void) => {
        throw new Error('With anonymous session handler, use only connection methods without session.');
    };

    readonly invalidateSessionId = (sessionId: string, callback: () => void) => {
        throw new Error('With anonymous session handler, use only connection methods without session.');
    };
}

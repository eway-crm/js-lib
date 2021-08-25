import { ISessionHandler } from './ISessionHandler';
import { ApiConnection } from './ApiConnection';
import { IApiResult } from './data/IApiResult';
import { TUnionError } from './exceptions/HttpRequestError';

type TLoginResponse = IApiResult & {
    SessionId: string | null;
    UserItemGuid: string | null;
    IsAdmin: boolean | null;
};

export class CredentialsSessionHandler implements ISessionHandler {
    private readonly username: string;
    private readonly passwordHash: string;
    private readonly appVersion: string;
    private readonly clientMachineIdentifier: string;
    private readonly clientMachineName: string;
    private readonly errorCallback: ((error: TUnionError) => void) | undefined;

    constructor (username: string, passwordHash: string, appVersion: string, clientMachineIdentifier: string, clientMachineName: string, errorCallback?: (error: TUnionError) => void) {
        if (!username || !passwordHash) {
            throw new Error("Non of the arguments 'username', 'passwordHash' can be empty.");
        }

        this.username = username;
        this.passwordHash = passwordHash;
        this.appVersion = appVersion;
        this.clientMachineIdentifier = clientMachineIdentifier;
        this.clientMachineName = clientMachineName;
        this.errorCallback = errorCallback;
    }

    readonly invalidateSessionId = (_: string, callback: () => void): void => {
        // Nothing to invalidate.
        if (callback) {
            callback();
        }
    };

    readonly getSessionId = (connection: ApiConnection, callback: (sessionId: string) => void): void => {
        connection.callWithoutSession(
            'LogIn',
            {
                userName: this.username,
                passwordHash: this.passwordHash,
                appVersion: this.appVersion,
                clientMachineIdentifier: this.clientMachineIdentifier,
                clientMachineName: this.clientMachineName,
                createSessionCookie: connection.SupportsGetItemPreviewMethod
            },
            (result: TLoginResponse) => {
                const newSessionId = result.SessionId;
                if (!newSessionId) {
                    const error = new Error('Successful login but no session came.');
                    if (this.errorCallback) {
                        this.errorCallback(error);
                    } else {
                        throw error;
                    }
                    return;
                }
                if (callback) {
                    callback(newSessionId);
                }
            },
            (result) => {
                const error = new Error('Unable to login. Error response follows.\n' + JSON.stringify(result));
                if (this.errorCallback) {
                    this.errorCallback(error);
                } else {
                    throw error;
                }
            }
        );
    };
}

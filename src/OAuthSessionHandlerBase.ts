import type { ApiConnection, ISessionHandler } from './ApiConnection';
import type { IApiResult } from './data/IApiResult';
import { ApiMethods } from './ApiMethods';
import type { HttpRequestError, TUnionError } from './exceptions/HttpRequestError';
import { WebServiceError } from './exceptions/WebServiceError';
import type { IApiLoginResponse } from './data/IApiLoginResponse';

export type GetAccessTokenResult = {
    error: string;
    accessToken?: undefined;
} | {
    error?: undefined;
    accessToken: string;
};

export abstract class OAuthSessionHandlerBase implements ISessionHandler {
    public lastSuccessfulLoginResponse?: IApiLoginResponse;

    private accessToken?: string;
    private readonly username: string;
    private readonly appVersion: string;
    protected readonly errorCallback: ((error: TUnionError) => void) | undefined;
    private readonly getNewAccessTokenCallback: ((connection: ApiConnection, callback: (result: GetAccessTokenResult) => void) => void);

    constructor(username: string, accessToken: string, appVersion: string,
        getNewAccessTokenCallback: ((connection: ApiConnection, callback: (result: GetAccessTokenResult) => void) => void),
        errorCallback?: (error: TUnionError) => void) {
        if (!username) {
            throw new Error("Non of the arguments 'username', 'clientId', 'clientSecret', 'refreshToken' can be empty.");
        }

        this.username = username;
        this.accessToken = accessToken;
        this.appVersion = appVersion;
        this.getNewAccessTokenCallback = getNewAccessTokenCallback;
        this.errorCallback = errorCallback;
    }

    invalidateSessionId(_: string, callback: () => void) {
        // Nothing to invalidate.
        if (callback) {
            callback();
        }
    };

    getSessionId(connection: ApiConnection, callback: (sessionId: string, loginResponse?: IApiLoginResponse) => void) {
        const successCallbackHandler = (result: IApiLoginResponse) => {
            this.lastSuccessfulLoginResponse = result;
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
                callback(newSessionId, result);
            }
        };

        const unsuccessCallbackHandler = (result: IApiResult) => {
            const error = new WebServiceError(result.ReturnCode, 'Unable to login. Error response follows.\n' + JSON.stringify(result));
            if (this.errorCallback) {
                this.errorCallback(error);
            } else {
                throw error;
            }
        };

        const errorCallbackHandler = (error: TUnionError) => {
            if ((error as HttpRequestError)?.statusCode === 401) {
                this.getNewAccessTokenCallback(connection, (result) => {
                    this.accessToken = result.accessToken;

                    if (!result.error) {
                        this.getSessionId(connection, callback);
                    }
                });

                return;
            }

            if (!this.errorCallback)
                throw error;

            this.errorCallback(error);
        };

        const loginInputData = {
            userName: this.username,
            appVersion: this.appVersion,
            createSessionCookie: connection.supportsGetItemPreviewMethod
        };

        const loginHeaders = {
            'Authorization': 'Bearer ' + this.accessToken
        };

        connection.callWithoutSession(
            ApiMethods.logIn,
            loginInputData,
            successCallbackHandler,
            unsuccessCallbackHandler,
            loginHeaders,
            undefined,
            errorCallbackHandler
        );
    };
}

export default OAuthSessionHandlerBase;
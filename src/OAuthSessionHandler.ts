import { ISessionHandler } from './ISessionHandler';
import { ApiConnection } from './ApiConnection';
import { IApiResult } from './data/IApiResult';
import { OAuthHelper } from '.';
import { ITokenData } from './interfaces/ITokenData';
import { HttpRequestError, TUnionError } from './exceptions/HttpRequestError';
import { WebServiceError } from './exceptions/WebServiceError';

type TLoginResponse = IApiResult & {
    SessionId: string | null;
    UserItemGuid: string | null;
    IsAdmin: boolean | null;
};

export class OAuthSessionHandler implements ISessionHandler {
    private readonly username: string;
    private readonly refreshToken: string;
    private readonly appVersion: string;
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly errorCallback: ((error: TUnionError) => void) | undefined;
    private readonly refreshTokenCallback?: ((tokenData: ITokenData) => void) | undefined;

    private accessToken: string;

    constructor (username: string, clientId: string, clientSecret: string, refreshToken: string, accessToken: string, appVersion: string, errorCallback?: (error: TUnionError) => void,
        refreshTokenCallback?: (tokenData: ITokenData) => void) {
        if (!username || !refreshToken || !clientId || !clientSecret) {
            throw new Error("Non of the arguments 'username', 'clientId', 'clientSecret', 'refreshToken' can be empty.");
        }

        this.username = username;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.appVersion = appVersion;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.errorCallback = errorCallback;
        this.refreshTokenCallback = refreshTokenCallback;
    }

    readonly invalidateSessionId = (_: string, callback: () => void) => {
        // Nothing to invalidate.
        if (callback) {
            callback();
        }
    };

    readonly getSessionId = (connection: ApiConnection, callback: (sessionId: string) => void) => {
        connection.callWithoutSession(
            'LogIn',
            {
                userName: this.username,
                appVersion: this.appVersion,
                createSessionCookie: connection.supportsGetItemPreviewMethod
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
                const error = new WebServiceError(result.ReturnCode, 'Unable to login. Error response follows.\n' + JSON.stringify(result));
                if (this.errorCallback) {
                    this.errorCallback(error);
                } else {
                    throw error;
                }
            },
            {
                'Authorization': 'Bearer ' + this.accessToken
            },
            undefined,
            (error) => {
                if ((error as HttpRequestError)?.statusCode === 401) {
                    this.getNewAccessToken(connection, (tokenData) => {
                        this.accessToken = tokenData.access_token;
                        if (!tokenData.error) {
                            this.getSessionId(connection, callback);
                        }
                    });

                    return;
                }

                if (!this.errorCallback)
                    throw error;

                this.errorCallback(error);
            }
        );
    };

    readonly getNewAccessToken = (connection: ApiConnection, callback: (tokenData: ITokenData) => void) => {
        OAuthHelper.refreshToken(connection.wsUrl, this.clientId, this.clientSecret, this.refreshToken, (tokenData) =>
        {
            try {
                if (this.refreshTokenCallback) {
                    this.refreshTokenCallback(tokenData);
                }
            } catch (error) {
                if (this.errorCallback) {
                    this.errorCallback(new Error('Refresh token callback failed.\n' + JSON.stringify(error)));
                }
            }

            callback(tokenData);
        });
    };
}

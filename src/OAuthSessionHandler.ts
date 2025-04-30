import type { ApiConnection } from './ApiConnection';
import { OAuthHelper } from './helpers/OAuthHelper';
import type { ITokenData } from './interfaces/ITokenData';
import type { TUnionError } from './exceptions/HttpRequestError';
import type { IApiLoginResponse } from './data/IApiLoginResponse';
import { type GetAccessTokenResult, OAuthSessionHandlerBase } from './OAuthSessionHandlerBase';

export class OAuthSessionHandler extends OAuthSessionHandlerBase {
    private readonly refreshToken: string;
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly refreshTokenCallback?: ((tokenData: ITokenData) => void) | undefined;
    public lastSuccessfulLoginResponse?: IApiLoginResponse;

    constructor(username: string, clientId: string, clientSecret: string, refreshToken: string, accessToken: string, appVersion: string, errorCallback?: (error: TUnionError) => void,
        refreshTokenCallback?: (tokenData: ITokenData) => void) {
        if (!username || !refreshToken || !clientId || !clientSecret) {
            throw new Error("Non of the arguments 'username', 'clientId', 'clientSecret', 'refreshToken' can be empty.");
        }

        const getNewAccessToken = (connection: ApiConnection, callback: (result: GetAccessTokenResult) => void): void => {
            OAuthHelper.refreshToken(connection.wsUrl, this.clientId, this.clientSecret, this.refreshToken, (tokenData) => {
                try {
                    if (this.refreshTokenCallback) {
                        this.refreshTokenCallback(tokenData);
                    }
                } catch (error) {
                    if (this.errorCallback) {
                        this.errorCallback(new Error('Refresh token callback failed.\n' + JSON.stringify(error)));
                    }
                }

                if (tokenData.error === undefined) {
                    callback({ accessToken: tokenData.access_token });
                    return;
                }
                callback({ error: tokenData.error });
            });
        };

        super(username, accessToken, appVersion, getNewAccessToken, errorCallback);

        this.refreshToken = refreshToken;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshTokenCallback = refreshTokenCallback;
    }
}

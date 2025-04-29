import type { AxiosError } from 'axios';
import Axios from 'axios';
import type { ITokenData } from '../interfaces/ITokenData';
import * as base64url from 'universal-base64url';
import jwt_decode from 'jwt-decode';
import type { IEWJwtPayload } from '../interfaces/IEWJwtPayload';

export type scope = "api" | "offline_access";

export type codeChallengeMethod = "plain" | "S256";

export class OAuthHelper {
    static finishAuthorization = (wsUrl: string, clientId: string, clientSecret: string, codeVerifier: string, authorizationCode: string, redirectUrl: string, callback: (tokenData: ITokenData) => void) => {
        const params = new URLSearchParams();
        params.append('code_verifier', codeVerifier);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('code', authorizationCode);
        params.append('redirect_uri', redirectUrl);
        params.append('grant_type', 'authorization_code');

        OAuthHelper.callTokenEndpoint(wsUrl, params, callback);
    };

    static refreshToken = (wsUrl: string, clientId: string, clientSecret: string, refreshToken: string, callback: (tokenData: ITokenData) => void) => {
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('refresh_token', refreshToken);
        params.append('grant_type', 'refresh_token');

        OAuthHelper.callTokenEndpoint(wsUrl, params, callback);
    };

    static getWebServiceUrl = (refreshToken: string) => {
        const parts = refreshToken.split('.');
        if (parts.length !== 2) {
            throw new Error('Invalid token supplied');
        }

        return base64url.decode(parts[1]);
    };

    static getUserName = (accessToken: string) => {
        const parts = OAuthHelper.decodeAccessToken(accessToken);
        return parts.username;
    };

    static decodeAccessToken = (accessToken: string) => {
        return jwt_decode<IEWJwtPayload>(accessToken);
    };

    static createAuthorizeUrl(clientId: string, scopes: scope[], redirectUri: string, state?: string, codeChallenge?: string, codeChallengeMethod?: codeChallengeMethod, isDev: boolean = false): string {
        if ((codeChallenge && !codeChallengeMethod) || (!codeChallenge && codeChallengeMethod)) {
            throw new Error("If codeChallenge is defined, codeChallengeMethod must also be defined and vice versa");
        }

        let authorizeUrl = `https://login.eway-crm.${isDev ? "dev" : "com"}?scope=${encodeURIComponent(scopes.join(" "))}` +
            `&prompt=login&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientId}`;

        if (state) {
            authorizeUrl += `&state=${encodeURIComponent(state)}`;
        }

        if (codeChallenge && codeChallengeMethod) {
            authorizeUrl += `&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=${encodeURIComponent(codeChallengeMethod)}`;
        }

        return authorizeUrl;
    }

    private static callTokenEndpoint = (wsUrl: string, params: URLSearchParams, callback: (tokenData: ITokenData) => void) => {
        Axios.post<ITokenData>(wsUrl + '/auth/connect/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            callback(response.data);
        }).catch((error: AxiosError<ITokenData>) => {
            if (error.response) {
                if (error.response.status == 400) {
                    callback(error.response.data);
                    return;
                }
            }

            callback(
                {
                    error: 'Token request failed',
                    access_token: "",
                    refresh_token: "",
                    expires_in: 0,
                    token_type: "",  
                }
            );
        });
    };
}
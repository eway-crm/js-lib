import Axios from 'axios';
import { ITokenData } from '../interfaces/ITokenData';
import base64url from 'base64url';
import jwt_decode from 'jwt-decode';
import { IEWJwtPayload } from '../interfaces/IEWJwtPayload';

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
    }

    static refreshToken = (wsUrl: string, clientId: string, clientSecret: string, refreshToken: string, callback: (tokenData: ITokenData) => void) => {
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('refresh_token', refreshToken);
        params.append('grant_type', 'refresh_token');

        OAuthHelper.callTokenEndpoint(wsUrl, params, callback);
    }

    static getWebServiceUrl = (refreshToken: string) => {
        const parts = refreshToken.split('.');
        if (parts.length !== 2) {
          throw new Error('Invalid token supplied');
        }

        return base64url.decode(parts[1]);
    }

    static getUserName = (accessToken: string) => {
        const parts = jwt_decode<IEWJwtPayload>(accessToken);

        return parts.username;
    }

    private static callTokenEndpoint = (wsUrl: string, params: URLSearchParams, callback: (tokenData: ITokenData) => void) => {
        Axios.post(wsUrl + '/auth/connect/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            callback(response.data);
        }, () => {
            throw new Error('Token request failed');
        });
    }
}
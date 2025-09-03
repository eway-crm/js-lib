/**
 * ApiClient provides methods to interact with the eWay-CRM API using a JWT access token.
 * Fetch method is used instead of Axios which is not supported in Cloudflare Workers.
 * Use it as alternative to ApiConnection class which uses Axios.
 * 
 * @remarks
 * - Requires a valid JWT access token for initialization.
 * - Handles session management internally.
 * - Throws errors if authentication or API calls fail.
 */
import type { TInputData, IApiResult, IApiLoginResponse, IApiDatumResponse, IApiDataResponse, IApiObjectType, IApiClientVersion, IApiLicense } from "./";
import type { ITokenSuccess } from "./interfaces/ITokenData";
import { OAuthHelper } from "./helpers/OAuthHelper";

export class ApiFetchClient {
    private appName: string;
    private sessionId: string | null = null;
    private isAdmin: boolean | null = null;
    private wsUrl: string;
    private userName: string;
    private endpoint: string;
    private accessToken: string;
    private loginResponse: IApiLoginResponse | null = null;

    public constructor(appName: string, accessToken: string, wsUrl?: string, username?: string) {
        let parts;
        if (!wsUrl) {
            parts = OAuthHelper.decodeAccessToken(accessToken);
            wsUrl = parts.ws;
            if (!wsUrl)
                throw new Error("Failed to get web service URL from JWT");
        }

        if (!username) {
            if (!parts) {
                parts = OAuthHelper.decodeAccessToken(accessToken);
            }

            username = parts.username;
            if (!username)
                throw new Error("Failed to get username from JWT");
        }

        this.appName = appName;
        this.wsUrl = wsUrl;
        this.userName = username;
        this.endpoint = wsUrl.startsWith("http://") ? "InsecureAPI.svc" : "API.svc";
        this.accessToken = accessToken;
    }

    public hasAdminRights(): boolean | null {
        return this.isAdmin;
    }

    public getWsUrl(): string {
        return this.wsUrl;
    }

    public getUserName(): string {
        return this.userName;
    }

    public getOutlookClientVersion(): string | undefined {
        return this.loginResponse?.OutlookClientVersion;
    }

    public getWebServiceVersion(): string | undefined {
        return this.loginResponse?.WcfVersion;
    }

    public async login() {
        const body = {
            userName: this.userName,
            appVersion: this.appName
        };

        const loginRequest = new Request(
            `${this.wsUrl}/${this.endpoint}/Login`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        const loginResponse = await fetch(loginRequest);
        const loginResponseBody = loginResponse.status === 200 ? await loginResponse.json() as IApiLoginResponse : undefined;

        if (!loginResponseBody || loginResponseBody.ReturnCode !== "rcSuccess") {
            throw new Error(`Login failed: ${loginResponseBody?.Description || "Unknown error"}`);
        }

        this.sessionId = loginResponseBody?.SessionId;
        this.isAdmin = loginResponseBody?.IsAdmin;
        this.loginResponse = loginResponseBody;
    }

    public async logout() {
        const logoutRequest = new Request(
            `${this.wsUrl}/${this.endpoint}/LogOut`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sessionId: this.sessionId })
            }
        );

        const logoutResponse = await fetch(logoutRequest);
        const logoutResponseBody = await logoutResponse.json() as { ReturnCode: string; SessionId?: string };

        if (logoutResponseBody.ReturnCode !== "rcSuccess") {
            throw new Error("Failed to logout");
        }
    }

    public async getObjectTypes(): Promise<IApiObjectType[]> {
        const response = await this.callMethod<IApiDataResponse<IApiObjectType>>("GetObjectTypes", {});
        return response.Data;
    }

    public async getLicense(): Promise<IApiLicense> {
        const response = await this.callMethod<IApiDatumResponse<IApiLicense>>("GetLicense", {});
        return response.Datum;
    }

    public async getClientVersionId(clientVersionName: string): Promise<number | undefined> {
        const queryData: TInputData = {
            "versionName": clientVersionName
        };

        return (await this.callMethod<IApiDatumResponse<IApiClientVersion>>("GetClientVersion", queryData)).Datum?.Id;
    }

    public async queryAmount(folderName: string, filter: object | null = null): Promise<IApiResult> {
        const queryData: TInputData = {
            "query": {
                "__type": "MainTableQuery:#EQ",
                "ItemTypes": [
                    folderName
                ],
                "Fields": [
                    {
                        "__type": "Column:#EQ",
                        "Source": {
                            "__type": "MainTable:#EQ"
                        },
                        "Name": "ItemGUID"
                    }
                ]
            }
        };

        // Add filter if provided
        if (filter) {
            (queryData.query as { Filter?: object }).Filter = filter;
        }

        return this.callMethod("QueryAmount", queryData);
    }

    public async query<TResult extends IApiResult>(folderName: string, fields: object | null = null, filter: object | null = null, sort: object | null = null): Promise<TResult> {
        const queryData: TInputData = {
            "query": {
                "__type": "MainTableQuery:#EQ",
                "ItemTypes": [
                    folderName
                ],
                "Fields": fields,
                "Paging": {
                    "Skip": 0,
                    "Take": 500
                }
            }
        };

        // Add filter if provided
        if (filter) {
            (queryData.query as { Filter?: object }).Filter = filter;
        }

        // Add sorting
        if (sort) {
            (queryData.query as { Sort?: object }).Sort = sort;
        }

        return this.callMethod<TResult>("Query", queryData);
    }

    public async callMethod<TResult extends IApiResult>(methodName: string, data: TInputData, method: string = "POST"): Promise<TResult> {
        if (!this.sessionId) {
            throw new Error("Session ID is not set. Please call init() first.");
        }

        data.sessionId = this.sessionId;

        const request = new Request(
            `${this.wsUrl}/${this.endpoint}/${methodName}`,
            {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: method === "POST" ? JSON.stringify(data) : undefined
            }
        );

        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Error calling method ${methodName}: ${response.statusText}`);
        }

        const responseBody = response.status === 200 ? await response.json() as TResult : undefined;
        if (!responseBody || responseBody.ReturnCode !== "rcSuccess") {
            throw new Error(`API call failed (${responseBody?.ReturnCode}): ${responseBody?.Description}`);
        }

        return responseBody;
    }

    public static async getTokenData(wsUrl: string, authorizationCode: string, redirectUrl: string, clientId: string, clientSecret: string): Promise<ITokenSuccess> {
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('code', authorizationCode);
        params.append('redirect_uri', redirectUrl);
        params.append('grant_type', 'authorization_code');

        const tokenRequest = new Request(
            `${wsUrl}/auth/connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            }
        );

        const response = await fetch(tokenRequest);
        if (!response.ok) {
            throw new Error(`Error calling token endpoint: ${response.statusText}`);
        }

        const tokenData = await response.json() as ITokenSuccess;
        if (!tokenData || !tokenData.access_token) {
            throw new Error("Failed to get access token");
        }

        return tokenData;
    }
}
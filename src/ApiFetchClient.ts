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
import { OAuthHelper } from "./";

export class ApiFetchClient {
    private appName: string;
    private sessionId: string | null = null;
    private wsUrl: string;
    private userName: string;
    private endpoint: string;
    private accessToken: string;
    private loginResponse: IApiLoginResponse | null = null;

    public constructor(appName: string, accessToken: string) {
        const parts = OAuthHelper.decodeAccessToken(accessToken);
        const wsUrl = parts.ws;
        if (!wsUrl) {
            throw new Error("Failed to get web service URL from JWT");
        }

        this.appName = appName;
        this.wsUrl = wsUrl;
        this.endpoint = wsUrl.startsWith("http://") ? "InsecureAPI.svc" : "API.svc";
        this.accessToken = accessToken;

        const userName = parts.username;
        if (!userName) {
            throw new Error("Failed to get username from JWT");
        }

        this.userName = userName;
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
        const response = await this.callMethod("GetObjectTypes", {}) as IApiDataResponse<IApiObjectType>;
        return response.Data;
    }

    public async getLicense(): Promise<IApiLicense> {
        const response = await this.callMethod("GetLicense", {}) as IApiDatumResponse<IApiLicense>;
        return response.Datum;
    }

    public async getClientVersionId(clientVersionName: string): Promise<number | undefined> {
        const queryData: TInputData = {
            "versionName": clientVersionName
        };

        return (await this.callMethod("GetClientVersion", queryData) as IApiDatumResponse<IApiClientVersion>).Datum?.Id;
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

    public async query(folderName: string, fields: object | null = null, filter: object | null = null, sort: object | null = null): Promise<IApiResult> {
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

        return this.callMethod("Query", queryData);
    }

    public async callMethod(methodName: string, data: TInputData, method: string = "POST"): Promise<IApiResult> {
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

        const responseBody = response.status === 200 ? await response.json() as IApiResult : undefined;
        if (!responseBody || responseBody.ReturnCode !== "rcSuccess") {
            throw new Error(`API call failed (${responseBody?.ReturnCode}): ${responseBody?.Description}`);
        }

        return responseBody;
    }

    public static async getAccessToken(wsUrl: string, authorizationCode: string, redirectUrl: string, clientSecret: string): Promise<string> {
        const params = new URLSearchParams();
        params.append('client_id', 'hostingoverview');
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

        return tokenData.access_token;
    }
}
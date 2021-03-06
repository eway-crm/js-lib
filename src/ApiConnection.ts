import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { ReturnCodes } from './ReturnCodes';
import { IApiResult } from './data/IApiResult';
import { ISessionHandler } from './ISessionHandler';
import { HttpMethod } from './HttpMethod';
import { CredentialsSessionHandler } from './CredentialsSessionHandler';
import { AnonymousSessionHandler } from './AnonymousSessionHandler';
import { ApiMethods } from './ApiMethods';
import { OAuthSessionHandler } from './OAuthSessionHandler';
import { HttpRequestError, TUnionError } from './exceptions/HttpRequestError';
import { ITokenData, TInputData } from './interfaces/ITokenData';
import base64url from 'base64url';
import { TFolderName } from './constants/FolderNames';

export class ApiConnection {
    private readonly svcUri: string;
    private readonly baseUri: string;
    private readonly sessionHandler: ISessionHandler;
    private readonly errorCallback: ((error: TUnionError, data?: TInputData | null) => void) | undefined;

    private sessionId: string | null;

    constructor(apiServiceUri: string, sessionHandler: ISessionHandler, errorCallback?: (error: TUnionError, data?: TInputData | null) => void) {
        if (!apiServiceUri) {
            throw new Error("The argument 'apiServiceUri' cannot be empty.");
        }
        if (apiServiceUri.length < 8 || (apiServiceUri.substr(0, 8).toLowerCase() !== 'https://' && apiServiceUri.substr(0, 7).toLowerCase() !== 'http://')) {
            throw new Error("Api service uri must start either with 'https://' or with 'http://'.");
        }

        if (apiServiceUri.substr(apiServiceUri.length - 4).toLowerCase() === '.svc') {
            this.svcUri = apiServiceUri;
            const apiServiceOptions = ['/API.svc', '/InsecureAPI.svc', '/WcfService/Service.svc'];
            const apiOption = apiServiceOptions.find((option) => option.toLowerCase() === apiServiceUri.substr(apiServiceUri.length - option.length).toLowerCase()) || '';
            this.baseUri = apiServiceUri.substr(0, apiServiceUri.length - apiOption.length);
        } else {
            this.baseUri = apiServiceUri;
            if (this.baseUri.substr(this.baseUri.length - 1) === '/') {
                this.baseUri = this.baseUri.substr(0, this.baseUri.length - 1);
            }

            if (apiServiceUri.substr(0, 8).toLowerCase() === 'https://') {
                this.svcUri = this.baseUri + '/API.svc';
            } else {
                this.svcUri = this.baseUri + '/InsecureAPI.svc';
            }
        }

        this.sessionHandler = sessionHandler;
        this.errorCallback = errorCallback;
        this.sessionId = null;
    }

    static create(
        apiServiceUri: string,
        username: string,
        passwordHash: string,
        appVersion: string,
        clientMachineIdentifier: string,
        clientMachineName: string,
        errorCallback?: (error: TUnionError) => void
    ): ApiConnection {
        return new ApiConnection(apiServiceUri, new CredentialsSessionHandler(username, passwordHash, appVersion, clientMachineIdentifier, clientMachineName, errorCallback), errorCallback);
    }

    static createAnonymous(apiServiceUri: string, errorCallback?: (error: TUnionError) => void): ApiConnection {
        return new ApiConnection(apiServiceUri, new AnonymousSessionHandler(), errorCallback);
    }

    static createUsingOAuth(
        apiServiceUri: string,
        username: string,
        clientId: string,
        clientSecret: string,
        refreshToken: string,
        accessToken: string,
        appVersion: string,
        errorCallback?: (error: TUnionError) => void,
        refreshTokenCallback?: (tokenData: ITokenData) => void
    ): ApiConnection {
        return new ApiConnection(apiServiceUri, new OAuthSessionHandler(username, clientId, clientSecret, refreshToken, accessToken, appVersion, errorCallback, refreshTokenCallback), errorCallback);
    }

    get wsUrl(): string {
        return this.baseUri;
    }

    readonly createOpenLink = (folderName: TFolderName, guid?: string, fileAs?: string): string => {
        const ws = base64url.encode(this.baseUri);
        let legacyLink = "eway://" + folderName;
        if (guid) {
            legacyLink +=  "/" + guid?.toLowerCase();
        }

        legacyLink = base64url.encode(legacyLink);
        let url = "https://open.eway-crm.com/?ws=" + ws + "&l=" + legacyLink;

        if (fileAs) {
            url += "&n=" + encodeURIComponent(fileAs);
        }

        return url;
    };

    readonly getWebAccessStatus = (callback: (result: { isAvailable: boolean; statusCode: number | null; statusText: string; address: string }) => void): void => {
        const address = this.baseUri + '/WA/Content/Images/loading.gif';
        let rethrowInPromiseCatch = false;
        Axios.head(address)
            .then((response: AxiosResponse) => {
                try {
                    if (response.status >= 200 && response.status < 400) {
                        callback({
                            isAvailable: true,
                            statusCode: response.status,
                            statusText: response.statusText,
                            address,
                        });
                    } else {
                        callback({
                            isAvailable: false,
                            statusCode: response.status,
                            statusText: response.statusText,
                            address,
                        });
                    }
                } catch (clbError) {
                    if (this.errorCallback) {
                        this.errorCallback(clbError);
                    } else {
                        rethrowInPromiseCatch = true;
                        throw clbError;
                    }
                }
            })
            .catch((error: Error) => {
                if (!rethrowInPromiseCatch && error) {
                    throw error;
                }
                callback({
                    isAvailable: false,
                    statusCode: null,
                    statusText: error.message,
                    address,
                });
            });
    };

    /**
     * Creates a promise for async API method call.
     * @param methodName API method name. Ex. 'GetUsers'.
     * @param data Input data or empty object. Ex. {transmitObject: {FileAs: 'Peter File'}} or {itemGuids: ['9ac561be-9b7d-4938-8e55-4cce97142483']}.
     * @param httpMethod Optional. The used HTTP method. POST or GET. Default is POST.
     * @param catchGlobally Optional. If true, raises this the global error handler each time the promise is rejected.
     */
    readonly askMethod = <TResult extends IApiResult>(methodName: string, data: TInputData, httpMethod?: HttpMethod, catchGlobally?: boolean): Promise<TResult> => {
        return new Promise<TResult>((resolve, reject) => {
            const errClb = catchGlobally
                ? (e: TUnionError | TResult): void => {
                      reject(e);
                      throw e;
                  }
                : reject;
            this.callMethod<TResult>(methodName, data, resolve, errClb, httpMethod, errClb);
        });
    };

    /**
     * Asynchronously calls API method with automatically added session data.
     * @param methodName API method name. Ex. 'GetUsers'.
     * @param data Input data or empty object. Ex. {transmitObject: {FileAs: 'Peter File'}} or {itemGuids: ['9ac561be-9b7d-4938-8e55-4cce97142483']}.
     * @param successCallback Handler callback when the method executes well. Gets the whole response JSON object as the only argument.
     * @param unsuccessCallback Optional. Handler callback for eWay-API app level failures. Gets the whole response JSON object as the only argument. If not supplied, the global error handler is used.
     * @param httpMethod Optional. The used HTTP method. POST or GET. Default is POST.
     * @param errorCallback Optional. Handler callback for any other failures. If not supplied, the global error handler is used.
     */
    readonly callMethod = <TResult extends IApiResult>(
        methodName: string,
        data: TInputData,
        successCallback: (result: TResult) => void,
        unsuccessCallback?: (result: TResult) => void,
        httpMethod?: HttpMethod,
        errorCallback?: (error: TUnionError) => void
    ): void => {
        if (!httpMethod) {
            httpMethod = HttpMethod.post;
        }
        const noSessionCallback = (): void => {
            this.sessionHandler.getSessionId(this, (newSessionId) => {
                this.sessionId = newSessionId;
                this.callMethod(methodName, data, successCallback, unsuccessCallback, httpMethod, errorCallback);
            });
        };

        const sessionId = this.sessionId;
        if (!sessionId) {
            noSessionCallback();
            return;
        }

        data.sessionId = sessionId;
        const unsuccessClb = (result: TResult): void => {
            if (result.ReturnCode === ReturnCodes.rcBadSession) {
                this.sessionId = null;
                if (methodName !== ApiMethods.logOut) {
                    this.sessionHandler.invalidateSessionId(sessionId, noSessionCallback);
                    return;
                }
            }
            if (unsuccessCallback) {
                unsuccessCallback(result);
            } else {
                const error = new Error('Unhandled connection return code ' + result.ReturnCode + ': ' + result.Description);
                if (this.errorCallback) {
                    this.errorCallback(error, data);
                } else {
                    throw error;
                }
            }
        };

        const successClb =
            methodName !== ApiMethods.logOut
                ? successCallback
                : (result: TResult): void => {
                      this.sessionId = null;
                      successCallback(result);
                  };

        this.callWithoutSession(methodName, data, successClb, unsuccessClb, null, httpMethod, errorCallback);
    };

    readonly callWithoutSession = <TResult extends IApiResult>(
        methodName: string,
        data: TInputData | null,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        headers?: Record<string, string> | null,
        httpMethod?: HttpMethod,
        errorCallback?: (error: TUnionError) => void
    ): void => {
        if (!httpMethod) {
            httpMethod = HttpMethod.post;
        }

        const methodUrl = this.svcUri + '/' + methodName;
        let config: AxiosRequestConfig | undefined;
        if (!!headers) {
            config = {
                headers,
            };
        }
        let promise: Promise<AxiosResponse<TResult>>;
        switch (httpMethod) {
            case HttpMethod.get:
                if (data) {
                    throw new Error('Calling api get method with data specified does not make any sense.');
                }
                promise = Axios.get(methodUrl, config);
                break;
            case HttpMethod.post:
                promise = Axios.post(methodUrl, data, config);
                break;
            default:
                throw new Error(`Unknown http method '${httpMethod as string}'.`);
        }

        const errorClb = (error: TUnionError): void => {
            if (errorCallback) {
                try {
                    errorCallback(error);
                } catch (e) {
                    if (this.errorCallback) {
                        this.errorCallback(e, data);
                    } else {
                        throw e;
                    }
                }
            } else {
                const err = new Error('Unhandled connection error when calling ' + methodUrl + ': ' + JSON.stringify(error));
                if (this.errorCallback) {
                    this.errorCallback(err, data);
                } else {
                    throw err;
                }
            }
        };

        ApiConnection.handleCallPromise(promise, successCallback, unsuccessCallback, errorClb);
    };

    readonly getItemPreviewGetMethodUrl = (folderName: string, itemGuid: string, itemVersion?: number): string => {
        return this.svcUri + '/' + ApiMethods.getItemPreview + '?folderName=' + folderName + '&itemGuid=' + itemGuid + (!!itemVersion || itemVersion === 0 ? '&itemVersion=' + itemVersion.toString() : '');
    };

    private static handleCallPromise<TResult extends IApiResult>(
        call: Promise<AxiosResponse<TResult>>,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: TUnionError) => void
    ): void {
        call.then((response: AxiosResponse<TResult>) => {
            if (response.status === 200) {
                if (response.data.ReturnCode === ReturnCodes.rcSuccess) {
                    successCallback(response.data);
                } else {
                    unsuccessCallback(response.data);
                }
            } else {
                errorCallback(new HttpRequestError(response.status, response.statusText));
            }
        }).catch((error: AxiosError) => {
            if (error.response) {
                errorCallback(new HttpRequestError(error.response.status, error.response.statusText));
                return;
            }

            errorCallback(error);
        });
    }
}

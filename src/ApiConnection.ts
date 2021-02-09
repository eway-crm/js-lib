import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ReturnCodes } from './ReturnCodes';
import { IApiResult } from './IApiResult';
import { ISessionHandler } from './ISessionHandler';
import { HttpMethod } from './HttpMethod';
import { CredentialsSessionHandler } from './CredentialsSessionHandler';
import { AnonymousSessionHandler } from './AnonymousSessionHandler';
import { ApiMethods } from './ApiMethods';

export class ApiConnection {
    private readonly svcUri: string;
    private readonly baseUri: string;
    private readonly sessionHandler: ISessionHandler;
    private readonly errorCallback: ((error: Error, data?: any) => void) | undefined;

    private sessionId: string | null;

    constructor(apiServiceUri: string, sessionHandler: ISessionHandler, errorCallback?: (error: any) => void) {
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
        errorCallback?: (error: Error) => void
    ): ApiConnection {
        return new ApiConnection(apiServiceUri, new CredentialsSessionHandler(username, passwordHash, appVersion, clientMachineIdentifier, clientMachineName, errorCallback), errorCallback);
    }

    static createAnonymous(apiServiceUri: string, errorCallback?: (error: Error) => void): ApiConnection {
        return new ApiConnection(apiServiceUri, new AnonymousSessionHandler(), errorCallback);
    }

    readonly getWebAccessStatus = (callback: (result: { isAvailable: boolean; statusCode: number | null; statusText: string; address: string }) => void) => {
        const address = this.baseUri + '/WA/Content/Images/loading.gif';
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
                        throw {
                            rethrowInPromiseCatch: true,
                            originalError: clbError,
                        };
                    }
                }
            })
            .catch((error) => {
                if (!error.rethrowInPromiseCatch && error.originalError) {
                    throw error.originalError;
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
    readonly askMethod = <TResult extends IApiResult>(methodName: string, data: object & any, httpMethod?: HttpMethod, catchGlobally?: boolean): Promise<TResult> => {
        return new Promise<TResult>((resolve, reject) => {
            const errClb = catchGlobally
                ? (e: any) => {
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
        data: object & any,
        successCallback: (result: TResult) => void,
        unsuccessCallback?: (result: TResult) => void,
        httpMethod?: HttpMethod,
        errorCallback?: (error: any) => void
    ) => {
        if (!httpMethod) {
            httpMethod = HttpMethod.post;
        }
        const noSessionCallback = () => {
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
        const unsuccessClb = (result: TResult) => {
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
                : (result: TResult) => {
                      this.sessionId = null;
                      successCallback(result);
                  };

        this.callWithoutSession(methodName, data, successClb, unsuccessClb, null, httpMethod, errorCallback);
    };

    readonly callWithoutSession = <TResult extends IApiResult>(
        methodName: string,
        data: object | null,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        headers?: any,
        httpMethod?: HttpMethod,
        errorCallback?: (error: any) => void
    ) => {
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
                if (!data) {
                    throw new Error('Calling api get method with data specified does not make any sense.');
                }
                promise = Axios.get(methodUrl, config);
                break;
            case HttpMethod.post:
                promise = Axios.post(methodUrl, data, config);
                break;
            default:
                throw new Error(`Unknown http method '${httpMethod}'.`);
        }

        const errorClb = (error: any) => {
            const err = new Error('Unhandled connection error when calling ' + methodUrl + ':' + error);
            if (errorCallback) {
                try {
                    errorCallback(err);
                } catch (e) {
                    if (this.errorCallback) {
                        this.errorCallback(e, data);
                    } else {
                        throw e;
                    }
                }
            } else {
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
        return this.svcUri + '/' + ApiMethods.getItemPreview + '?folderName=' + folderName + '&itemGuid=' + itemGuid + (!!itemVersion || itemVersion === 0 ? '&itemVersion=' + itemVersion : '');
    };

    private static handleCallPromise<TResult extends IApiResult>(
        call: Promise<AxiosResponse<TResult>>,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: any) => void
    ) {
        call.then((response: AxiosResponse<TResult>) => {
            if (response.status === 200) {
                if (response.data.ReturnCode === ReturnCodes.rcSuccess) {
                    successCallback(response.data);
                } else {
                    unsuccessCallback(response.data);
                }
            } else {
                errorCallback(response);
            }
        }).catch((error) => {
            errorCallback(error);
        });
    }
}

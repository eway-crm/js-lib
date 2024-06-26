import type { AxiosError } from 'axios';
import Axios from 'axios';
import type { HttpMethod } from '../HttpMethod';
import type { ApiConnection } from '../ApiConnection';
import type { ITokenizedApiResult } from './ITokenizedApiResult';
import type { IApiResult } from '../data/IApiResult';
import type { TUnionError } from '../exceptions/HttpRequestError';
import { HttpRequestError } from '../exceptions/HttpRequestError';
import type { TInputData } from '../interfaces/ITokenData';

export class TokenizedServiceConnection<TObtainResponse extends IApiResult> {
    private readonly obtainTokenMethodName: string;
    private readonly obtainTokenMethodType: HttpMethod;
    private readonly needsSession: boolean;
    private readonly invalidTokenReturnCode: string;
    private readonly urlAndTokenObtainer: (response: TObtainResponse) => { url: string | null; token: string | null };
    private readonly connection: ApiConnection;
    private readonly generalErrorCallback: ((error: Error) => void) | null;

    private url: string | null;
    private token: string | null;
    private isActive: boolean;

    constructor(
        obtainTokenMethodName: string,
        obtainTokenMethodType: HttpMethod,
        needsSession: boolean,
        invalidTokenReturnCode: string,
        urlAndTokenObtainer: (response: TObtainResponse) => { url: string | null; token: string | null },
        connection: ApiConnection,
        errorCallback?: (error: Error) => void
    ) {
        this.obtainTokenMethodName = obtainTokenMethodName;
        this.obtainTokenMethodType = obtainTokenMethodType;
        this.needsSession = needsSession;
        this.invalidTokenReturnCode = invalidTokenReturnCode;
        this.urlAndTokenObtainer = urlAndTokenObtainer;
        this.connection = connection;
        this.generalErrorCallback = errorCallback || null;
        this.url = null;
        this.token = null;
        this.isActive = true;
    }

    readonly isEnabled = (enabledCallback: (url: string, token: string) => void, disabledCallback: () => void) => {
        const check = () => {
            if (!this.url || !this.token) {
                disabledCallback();
            } else {
                enabledCallback(this.url, this.token);
            }
        };

        if (!this.url || !this.token) {
            this.obtainToken(check);
            return;
        } else {
            enabledCallback(this.url, this.token);
        }
    };

    readonly callTokenizedApi = <TResult extends ITokenizedApiResult>(
        methodName: string,
        data: TInputData,
        successCallback: (data: TResult) => void,
        unsuccessCallback?: ((data: TResult | null) => void) | null
    ) => {
        this.isEnabled(
            (url: string, token: string) => {
                data.token = token;
                TokenizedServiceConnection.call(
                    url,
                    methodName,
                    data,
                    successCallback,
                    (result: TResult) => {
                        if (result.ReturnCodeString === this.invalidTokenReturnCode) {
                            this.obtainToken(() => {
                                this.callTokenizedApi(methodName, data, successCallback, unsuccessCallback);
                            });
                            return;
                        }
                        if (unsuccessCallback) {
                            unsuccessCallback(result);
                        } else {
                            if (!!this.generalErrorCallback) {
                                const error = new Error('Unhandled tokenized service connection return code ' + result.ReturnCodeString + '.\nDescription: ' + result.Description);
                                this.generalErrorCallback(error);
                            }
                        }
                    },
                    (error: TUnionError) => {
                        if (!!this.generalErrorCallback) {
                            const err = new Error('Unhandled tokenized service connection communication error: ' + JSON.stringify(error));
                            this.generalErrorCallback(err);
                        }
                    }
                );
            },
            () => {
                if (unsuccessCallback) {
                    unsuccessCallback(null);
                }
            }
        );
    };

    private readonly obtainToken = (callback: () => void) => {
        if (!this.isActive) {
            this.url = null;
            this.token = null;
            callback();
            return;
        }

        const successClb = (result: TObtainResponse) => {
            const obtainedResult = this.urlAndTokenObtainer(result);
            if (!obtainedResult.url || !obtainedResult.token) {
                this.url = null;
                this.token = null;
                this.isActive = false;
                callback();
            } else {
                this.url = obtainedResult.url;
                this.token = obtainedResult.token;
                this.isActive = true;
                callback();
            }
        };
        const unsuccessClb = () => {
            this.url = null;
            this.token = null;
            this.isActive = false;
            callback();
        };

        if (this.needsSession) {
            this.connection.callMethod(this.obtainTokenMethodName, {}, successClb, unsuccessClb, this.obtainTokenMethodType);
        } else {
            this.connection.callWithoutSession(this.obtainTokenMethodName, null, successClb, unsuccessClb, null, this.obtainTokenMethodType);
        }
    };

    private static call<TResult extends ITokenizedApiResult>(
        serviceUrl: string,
        methodName: string,
        data: TInputData,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: TUnionError) => void
    ) {
        // We count on that we are in Admin/Subdirectory.
        const address = serviceUrl + '/' + methodName;
        Axios.post<TResult>(address, data)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.ReturnCodeString === 'Success') {
                        successCallback(response.data);
                    } else {
                        unsuccessCallback(response.data);
                    }
                } else {
                    errorCallback(new HttpRequestError(response.status, response.statusText));
                }
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    errorCallback(new HttpRequestError(error.response.status, error.response.statusText));
                    return;
                }

                errorCallback(error);
            });
    }
}

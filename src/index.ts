import * as Promise from 'es6-promise';
import Axios, { AxiosResponse } from 'axios';
import { ReturnCodes } from './ReturnCodes';
import { IApiResult } from './IApiResult';
import { ISessionHandler } from './ISessionHandler';
import { HttpMethod } from './HttpMethod';
import { CredentialsSessionHandler } from './CredentialsSessionHandler';

Promise.polyfill();

export class ApiConnection {
    private readonly svcUri: string;
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
        } else {
            if (apiServiceUri.substr(apiServiceUri.length - 1) !== '/') {
                apiServiceUri += '/';
            }
            if (apiServiceUri.substr(0, 8).toLowerCase() === 'https://') {
                this.svcUri = apiServiceUri + 'API.svc';
            } else {
                this.svcUri = apiServiceUri + 'InsecureAPI.svc';
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
        errorCallback?: (error: Error) => void,
    ): ApiConnection {
        return new ApiConnection(apiServiceUri, new CredentialsSessionHandler(username, passwordHash, appVersion, clientMachineIdentifier, clientMachineName, errorCallback));
    }

    readonly callMethod = <TResult extends IApiResult>(
        methodName: string,
        data: any,
        successCallback: (result: TResult) => void,
        unsuccessCallback?: (result: TResult) => void,
        httpMethod?: HttpMethod,
    ) => {
        if (!httpMethod) {
            httpMethod = HttpMethod.post;
        }
        const noSessionCallback = () => {
            this.sessionHandler.getSessionId(this, (newSessionId) => {
                this.sessionId = newSessionId;
                this.callMethod(methodName, data, successCallback, unsuccessCallback, httpMethod);
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
                this.sessionHandler.invalidateSessionId(sessionId, noSessionCallback);
                return;
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
        const errorClb = (error: any) => {
            const err = new Error('Unhandled connection error when calling ' + methodName + ':' + error);
            if (this.errorCallback) {
                this.errorCallback(err, data);
            } else {
                throw err;
            }
        };

        switch (httpMethod) {
            case HttpMethod.get:
                this.callGetWithoutSession(methodName, successCallback, unsuccessClb, errorClb);
                break;
            case HttpMethod.post:
                this.callWithoutSession(methodName, data, successCallback, unsuccessClb, errorClb);
                break;
            default:
                throw new Error(`Unknown http method '${httpMethod}'.`);
        }
    };

    readonly callWithoutSession = <TResult extends IApiResult>(
        methodName: string,
        data: object,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: any) => void,
    ) => {
        const methodUrl = this.svcUri + '/' + methodName;
        const promise = Axios.post(methodUrl, data);
        ApiConnection.handleCallPromise(promise, successCallback, unsuccessCallback, errorCallback);
    };

    readonly callGetWithoutSession = <TResult extends IApiResult>(
        methodName: string,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: any) => void,
    ) => {
        const methodUrl = this.svcUri + '/' + methodName;
        const promise = Axios.get(methodUrl);
        ApiConnection.handleCallPromise(promise, successCallback, unsuccessCallback, errorCallback);
    };

    private static handleCallPromise<TResult extends IApiResult>(
        call: Promise<AxiosResponse<any>>,
        successCallback: (result: TResult) => void,
        unsuccessCallback: (result: TResult) => void,
        errorCallback: (error: any) => void,
    ) {
        call.then((response: AxiosResponse<TResult>) => {
            if (response.status === 200) {
                if (response.data.ReturnCode === 'rcSuccess') {
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

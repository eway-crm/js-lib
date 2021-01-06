import { TokenizedServiceConnection } from './TokenizedServiceConnection';
import { ApiConnection } from '../ApiConnection';
import { ITokenizedApiResult } from './ITokenizedApiResult';
import { HttpMethod } from '../HttpMethod';
import { IApiResult } from '../IApiResult';

type TObtainResponse = { ServiceUrl: string | null; Token: string | null } & IApiResult;
const obtainer = (result: TObtainResponse) => {
    return { url: result.ServiceUrl, token: result.Token };
};

export class CommonDataConnection {
    private readonly tokenizedConnection: TokenizedServiceConnection<TObtainResponse>;

    constructor(connection: ApiConnection, errorCallback?: (error: Error) => void) {
        this.tokenizedConnection = new TokenizedServiceConnection<TObtainResponse>('ObtainCommonDataApiAccessToken', HttpMethod.get, false, 'InvalidCommonDataToken', obtainer, connection, errorCallback);
    }

    readonly isCommonDataApiEnabled = (enabledCallback: (url: string, token: string) => void, disabledCallback: () => void) => {
        this.tokenizedConnection.isEnabled(enabledCallback, disabledCallback);
    };

    readonly callCommonDataApi = <TResult extends ITokenizedApiResult>(
        methodName: string,
        data: any,
        successCallback: (data: TResult) => void,
        unsuccessCallback?: ((data: TResult | null) => void) | null
    ) => {
        this.tokenizedConnection.callTokenizedApi(methodName, data, successCallback, unsuccessCallback);
    };
}

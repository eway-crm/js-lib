import { TokenizedServiceConnection } from "./TokenizedServiceConnection";
import { ApiConnection } from "../ApiConnection";
import { ITokenizedApiResult } from "./ITokenizedApiResult";
import { HttpMethod } from "../HttpMethod";
import { IApiResult } from "../IApiResult";

type TObtainResponse = { ServiceUrl: string | null, Token: string | null } & IApiResult;
const obtainer = (result: TObtainResponse) => {
    return { url: result.ServiceUrl, token: result.Token };
};

export class CommonDataConnection extends TokenizedServiceConnection<TObtainResponse> {

    constructor(connection: ApiConnection, errorCallback?: (error: Error) => void) {
        super('ObtainCommonDataApiAccessToken', HttpMethod.get, false, 'InvalidCommonDataToken', obtainer, connection, errorCallback);
    }

    readonly isCommonDataApiEnabled = (enabledCallback: (url: string, token: string) => void, disabledCallback: () => void) => {
        this.isEnabled(enabledCallback, disabledCallback);
    };

    readonly callCommonDataApi = <TResult extends ITokenizedApiResult>(methodName: string, data: any, successCallback: (data: TResult) => void, unsuccessCallback?: ((data: TResult | null) => void) | null) => {
        this.callTokenizedApi(methodName, data, successCallback, unsuccessCallback);
    };
}
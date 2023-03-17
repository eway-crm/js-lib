import ApiConnection, { TUnionError, IApiLoginResponse, IAccessTokenProvidingEwayBrowserBoundObject } from ".";
import { OAuthSessionHandlerBase } from "./OAuthSessionHandlerBase";

export class EwayBrowserWithBoundObjectSessionHandler extends OAuthSessionHandlerBase {
	public lastSuccessfulLoginResponse: IApiLoginResponse | undefined;

    private boundObject: IAccessTokenProvidingEwayBrowserBoundObject;
    
	constructor (boundObject: IAccessTokenProvidingEwayBrowserBoundObject, errorCallback: ((error: TUnionError) => void)) {
        super(boundObject.getUserName(), boundObject.getAccessToken(), boundObject.getAppVersion(), errorCallback);

        this.boundObject = boundObject;
	}

    getNewAccessToken(connection: ApiConnection, callback: (accessToken: string, error?: string) => void): void {
        callback(this.boundObject.getAccessToken());
    }
}

export default EwayBrowserWithBoundObjectSessionHandler;
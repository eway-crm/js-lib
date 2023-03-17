export interface IAccessTokenProvidingEwayBrowserBoundObject {
    getAccessToken: () => string;
    getAppVersion: () => string;
    getUserName: () => string;
}
import type { WebServiceError } from './WebServiceError';

export type TUnionError = Error | HttpRequestError | WebServiceError;

export class HttpRequestError extends Error {
    constructor(public statusCode: number, public message: string, public readonly responseData?: unknown) {
        super(message);
    }

    /**
     * Builds the error from a non-200 HTTP response. Prefers the API result body's Description over the HTTP
     * status text, which is empty over HTTP/2 (reason phrases do not exist there anymore). The body is kept in
     * responseData so callers can inspect the ReturnCode; it is typed unknown because a non-200 body may as well
     * be a proxy/server error page instead of the API json.
     */
    static readonly fromResponse = (statusCode: number, statusText: string, responseData: unknown): HttpRequestError => {
        const description =
            typeof responseData === 'object' && responseData !== null && 'Description' in responseData && typeof (responseData as { Description: unknown }).Description === 'string'
                ? (responseData as { Description: string }).Description
                : null;
        return new HttpRequestError(statusCode, description || statusText, responseData);
    };
}

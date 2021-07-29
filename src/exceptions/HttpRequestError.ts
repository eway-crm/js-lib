import { WebServiceError } from "./WebServiceError";

export type TUnionError = Error | HttpRequestError | WebServiceError;

export class HttpRequestError extends Error {
    constructor (public statusCode: number, public message: string) {
        super();
    }
}
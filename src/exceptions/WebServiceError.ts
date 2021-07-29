export class WebServiceError extends Error {
    constructor (public returnCode: string, public message: string) {
        super();
    }
}
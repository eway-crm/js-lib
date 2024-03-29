export default class ErrorHelper {
    static readonly stringifyError = (error: Error) => {
        return JSON.stringify(error, ErrorHelper.replaceErrors);
    };

    private static readonly replaceErrors = (_key: string, value: unknown) => {
        if (value instanceof Error) {
            const error: Record<string, unknown> = {};
            Object.getOwnPropertyNames(value).forEach((propName) => {
                error[propName] = (value as never)[propName];
            });

            return error;
        }

        return value;
    };
}
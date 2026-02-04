/**
 * StringHelper contains helper methods for string manipulation relevant for eWay-CRM
 * @class StringHelper
 */
export default class StringHelper {
    /**
     * Trim a string to a desired length and optionally add continuation dots to the end of the string
     * @example
     *  //returns "I think..."
     *  StringHelper.trim("I think, therefore I am!", 10, true);
     * @static
     */
    static trim<T extends string | null | undefined>(value: T, maxLength: number, includeDots: boolean = false): T {
        if (value === null || typeof value === "undefined")
            return value;

        let trimmedValue = value.trim();

        if (trimmedValue.length <= maxLength)
            return trimmedValue as T;

        trimmedValue = trimmedValue.substring(0, maxLength - (includeDots ? 3 : 0));

        if (includeDots) {
            trimmedValue += "...";
        }

        return trimmedValue as T;
    }
}
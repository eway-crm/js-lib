
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
     * @param {string} value 
     * @param {number} maxLength
     * @param {boolean} [includeDots=false]
     */
    static trim(value: string, maxLength: number, includeDots: boolean = false): string {
        value = value.trim();

        if (value.length <= maxLength) return value;

        let trimmedValue = value.substring(0, maxLength - (includeDots ? 3 : 0));

        if (includeDots) trimmedValue += "...";

        return trimmedValue;
    }
}
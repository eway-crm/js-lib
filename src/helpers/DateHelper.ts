
export default class DateHelper {
    /**
     * Checks if the date object is valid.
     * https://stackoverflow.com/a/1353711
     */
    static isValid = (d: Date) => {
        return d instanceof Date && !isNaN(d.getTime());
    };

    static areDaysEqual = (date1: Date, date2: Date) => {
        const d1 = DateHelper.clearTime(date1);
        const d2 = DateHelper.clearTime(date2);

        return d1.getTime() === d2.getTime();
    };

    static areTimesEqual = (date1: Date, date2: Date) => {
        return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
    };

    static areDatesEqual = (date1: Date | null, date2: Date | null) => {
        return !!date1 && !!date2 && DateHelper.areDaysEqual(date1, date2) && DateHelper.areTimesEqual(date1, date2);
    };

    static clearTime = (date: Date) => {
        const newDate = new Date(date);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    };

    static isWithoutTime = (date: Date) => {
        return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
    };

    static getFormattedSqlDateTime = (date: Date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    static getRfcWithoutTimezone = (dateString: string) => {
        return dateString.slice(0, 19);
    };

    /** 
     * Converts the date to the RFC3339 string preserving the given time zone info (does not convert to Zulu time as toISOString() does).
     */
    static toRfc3339String(d: Date) {
        const pad = (n: number) => {
            return n < 10 ? `0${n}` : String(n);
        };

        const getTimezoneOffsetString = (offset: number) => {
            if (offset === 0) {
                return 'Z';
            }
            const sign = (offset > 0) ? '-' : '+';
            offset = Math.abs(offset);
            return `${sign}${pad(Math.floor(offset / 60))}:${pad(offset % 60)}`;
        };

        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${getTimezoneOffsetString(d.getTimezoneOffset())}`;
    }
}

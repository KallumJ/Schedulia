export default class DateUtils {
    static isValidDateString(date: string) {
        return new Date(date).toString() !== 'Invalid Date';
    }
    public static getDaysInMonth(date: Date): number {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return new Date(year, month, 0).getDate();
    }

    public static getMonthString(date: Date): string {
        return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
    }

    public static isDateToday(date: Date): boolean {
        const moment = new Date();
        return moment.toDateString() === date.toDateString();
    }

    public static formatDate(date: Date): string {
        return date.toLocaleDateString('en-CA');
    }
}
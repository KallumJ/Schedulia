export default class DateUtils {
    public static getDaysInMonth(date: Date): number {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return new Date(year, month, 0).getDate();
    }

    public static getMonthString(date: Date): string {
        return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
    }
}
import styles from "../../styles/components/schedule/DayGrid.module.scss";
import DateUtils from "../../util/date_utils";
import Day from "./Day"

interface DayGridProps {
    month: Date;
}

export default function DayGrid({ month }: DayGridProps) {
    const days = [];
    for (let i = 1; i <= DateUtils.getDaysInMonth(month); i++) {
        days.push(i);
    }

    return (
        <div className={styles.grid}>
            {
                days.map((day) => <Day date={new Date(month.getFullYear(), month.getMonth(), day)}></Day>)
            }
        </div>
    )
}

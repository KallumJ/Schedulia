import styles from "../../styles/components/schedule/Day.module.scss";
import DateUtils from "../../util/date_utils"

interface DayProps {
    date: Date
}

export default function Day({ date }: DayProps) {
    const isToday = DateUtils.isDateToday(date)

    return (
        <div className={styles.day_card}>
            <p className={styles.day_number} style={isToday ? { backgroundColor: "lightblue" } : {}}>{date.getDate()}</p>
        </div>
    )
}
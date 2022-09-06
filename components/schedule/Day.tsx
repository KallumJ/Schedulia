import styles from "../../styles/components/schedule/Day.module.scss";
import DateUtils from "../../util/date_utils"
import MediaEvent from "./MediaEvent"

interface DayProps {
    date: Date
}

export default function Day({ date }: DayProps) {
    const isToday = DateUtils.isDateToday(date)

    return (
        <div className={styles.day_card}>
            <span className={styles.day_number_container}><p className={styles.day_number} style={isToday ? { backgroundColor: "lightblue" } : {}}>{date.getDate()}</p></span>

        </div>
    )
}

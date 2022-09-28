import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/Day.module.scss";
import DateUtils from "../../util/date_utils"
import MediaEventListItem from "./MediaEventListItem";

interface DayProps {
    date: Date,
    events: MediaEvent[]
}

export default function Day({ date, events }: DayProps) {
    const isToday = DateUtils.isDateToday(date)

    return (
        <div className={styles.day_card}>
            <span className={styles.day_number_container} style={isToday ? { backgroundColor: "lightblue" } : {}}><p className={styles.day_number}>{date.getDate()}</p></span>
            {events.map(event => <MediaEventListItem event={event}></MediaEventListItem>)}
        </div>
    )
}

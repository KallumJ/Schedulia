import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/Day.module.scss";
import DateUtils from "../../util/date_utils"
import MediaEventComponent from "./MediaEventComponent";

interface DayProps {
    date: Date,
    events: MediaEvent[]
}

export default function Day({ date, events }: DayProps) {
    const isToday = DateUtils.isDateToday(date)

    return (
        <div className={styles.day_card}>
            <span className={styles.day_number_container}><p className={styles.day_number} style={isToday ? { backgroundColor: "lightblue" } : {}}>{date.getDate()}</p></span>
            {events.map(event => <MediaEventComponent event={event}></MediaEventComponent>)}
        </div>
    )
}

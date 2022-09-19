import styles from "../../styles/components/schedule/Month.module.scss";
import DateUtils from "../../util/date_utils";
import Day from "./Day"
import { MediaEvent } from "../../data/media_event";;
import { useState } from "react"

interface MonthProps {
    month: Date;
    events: MediaEvent[]
}

export default function Month({ month, events }: MonthProps) {
    const days = [];
    for (let i = 1; i <= DateUtils.getDaysInMonth(month); i++) {
        const date = new Date(month.getFullYear(), month.getMonth(), i);
        const daysEvents = events.filter(event => event.releaseDate && DateUtils.areDatesEqual(new Date(event.releaseDate), date))
        days.push(<Day key={date.getDate()} date={date} events={daysEvents} />);
    }

    return (
        <div className={styles.grid}>
            {days}
        </div>
    )
}

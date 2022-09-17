import styles from "../../styles/components/schedule/Month.module.scss";
import DateUtils from "../../util/date_utils";
import Day from "./Day"
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MediaEvent } from "../../data/media_event";

interface MonthProps {
    month: Date;
    events: MediaEvent[]
}

export default function Month({ month, events }: MonthProps) {

    const fadeAnim = keyframes`${fadeIn}`;
    const FadeInDiv = styled.div`animation: 0.5s ${fadeAnim};`;

    const days = [];
    for (let i = 1; i <= DateUtils.getDaysInMonth(month); i++) {
        const date = new Date(month.getFullYear(), month.getMonth(), i);
        const daysEvents = events.filter(event => event.releaseDate && DateUtils.areDatesEqual(new Date(event.releaseDate), date))
        days.push(<Day key={date.getDate()} date={date} events={daysEvents} />);
    }
    
    return (
        <FadeInDiv className={styles.grid}>
            {events.length == 0 ? <p>Loading...</p> : days}
        </FadeInDiv>
    )
}

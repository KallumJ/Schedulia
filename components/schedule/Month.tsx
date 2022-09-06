import styles from "../../styles/components/schedule/Month.module.scss";
import DateUtils from "../../util/date_utils";
import Day from "./Day"
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

interface MonthProps {
    month: Date;
}

export default function Month({ month }: MonthProps) {
    const days = [];
    for (let i = 1; i <= DateUtils.getDaysInMonth(month); i++) {
        days.push(i);
    }

    const fadeAnim = keyframes`${fadeIn}`;
    const FadeInDiv = styled.div`animation: 1s ${fadeAnim};`;

    return (
        <FadeInDiv className={styles.grid}>
            {
                days.map((day) => <Day date={new Date(month.getFullYear(), month.getMonth(), day)}></Day>)
            }
        </FadeInDiv>
    )
}

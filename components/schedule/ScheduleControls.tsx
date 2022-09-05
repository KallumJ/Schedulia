import DateUtils from "../../util/date_utils";
import styles from "../../styles/components/schedule/ScheduleControls.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface ScheduleControlsProps {
    currentMonth: Date,
    onIncrementMonth: () => void;
    onDecrementMonth: () => void;
}

export default function ScheduleControls({ onIncrementMonth, onDecrementMonth, currentMonth }: ScheduleControlsProps) {
    return (
        <div className={styles.container}>
            <button onClick={() => onIncrementMonth()}><FaArrowLeft /></button>
            <h4 className={styles.date}>{DateUtils.getMonthString(currentMonth)}</h4>
            <button onClick={() => onDecrementMonth()}><FaArrowRight /></button>
        </div>
    )
}

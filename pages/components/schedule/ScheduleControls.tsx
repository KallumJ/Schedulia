import DateUtils from "../../../util/date_utils";
import styles from "../../../styles/components/schedule/ScheduleControls.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface ScheduleControlsProps {
    currentDate: Date,
    onIncrementMonth: () => void;
    onDecrementMonth: () => void;
}

export default function ScheduleControls({ onIncrementMonth, onDecrementMonth, currentDate }: ScheduleControlsProps) {
    return (
        <div className={styles.container}>
            <button onClick={() => onIncrementMonth()}><FaArrowLeft /></button>
            <h3>{DateUtils.getMonthString(currentDate)}</h3>
            <button onClick={() => onDecrementMonth()}><FaArrowRight /></button>
        </div>
    )
}

import React, { useState } from 'react'
import ScheduleControls from './ScheduleControls';
import DayGrid from './DayGrid';


export default function Schedule() {
    const moment = new Date();
    const firstDayOfCurrentMonth = new Date(moment.getFullYear(), moment.getMonth(), 1);

    const [currentDate, setCurrentDate] = useState(firstDayOfCurrentMonth);

    const incrementMonth = () => {
        const month = currentDate.getMonth() - 1;
        const year = currentDate.getFullYear();

        setCurrentDate(new Date(year, month));
    }

    const decrementMonth = () => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        setCurrentDate(new Date(year, month));
    }


    return (
        <div>
            <ScheduleControls onIncrementMonth={incrementMonth} onDecrementMonth={decrementMonth} currentMonth={currentDate} />
            <DayGrid month={currentDate} />
        </div>
    )
}

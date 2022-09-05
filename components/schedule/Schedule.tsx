import React, { useState } from 'react'
import ScheduleControls from './ScheduleControls';


export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());

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
            <ScheduleControls onIncrementMonth={incrementMonth} onDecrementMonth={decrementMonth} currentDate={currentDate} />
        </div>
    )
}

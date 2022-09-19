import React, { useState, useEffect } from 'react'
import ScheduleControls from './ScheduleControls';
import Month from './Month';
import axios from 'axios';
import DateUtils from '../../util/date_utils';
import { MediaEvent } from '../../data/media_event';


export default function Schedule() {
    const moment = new Date();
    const firstDayOfCurrentMonth = new Date(moment.getFullYear(), moment.getMonth(), 1);

    const [currentDate, setCurrentDate] = useState(firstDayOfCurrentMonth);
    const [events, setEvents] = useState<MediaEvent[]>([]);

    const incrementMonth = () => {
        const month = currentDate.getMonth() - 1;
        const year = currentDate.getFullYear();

        setCurrentDate(new Date(year, month));
        setEvents([])
    }

    const decrementMonth = () => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        setCurrentDate(new Date(year, month));
        setEvents([])
    }

    const getEvents = async () => {
        const response = await axios.get(`/api/media_events?month=${DateUtils.formatDate(currentDate)}`)
        const events: MediaEvent[] = await response.data;

        setEvents(events);
    }

    useEffect(() => {
        getEvents();
    }, [currentDate])


    return (
        <div>
            <ScheduleControls onIncrementMonth={incrementMonth} onDecrementMonth={decrementMonth} currentMonth={currentDate} />
            <Month month={currentDate} events={events} />
        </div>
    )
}

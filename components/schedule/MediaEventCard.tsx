import { eventNames } from 'process'
import React from 'react'
import { MediaEvent } from '../../data/media_event'
import styles from "../../styles/components/schedule/MediaEventCard.module.scss"

interface MediaEventCardProps {
    event: MediaEvent,
    showCard: boolean,
    setShowCard: Function
}

export default function MediaEventCard({ event, showCard, setShowCard }: MediaEventCardProps) {
    return (
        <div className={styles.modal} style={{ display: showCard ? "block" : "none" }}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h1 className={styles.event_title}>{event.title}</h1>
                    <button onClick={() => { setShowCard(!showCard) }}>Close</button>
                </div>
                <div className={styles.event_content}>
                    <p className={styles.event_desc}>{event.description}</p>
                    {event.image ? <img className={styles.event_image} src={event.image} alt={`Image of ${event.title}`} /> : <></>}
                </div>
            </div>
        </div>
    )
}

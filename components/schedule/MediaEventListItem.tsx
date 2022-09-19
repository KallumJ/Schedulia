import Popup from "reactjs-popup";
import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/MediaEventListItem.module.scss";
import MediaEventCard from "./MediaEventCard";
import { useState, useEffect } from "react"

interface MediaEventListItemProps {
    event: MediaEvent
}

export default function MediaEventListItem({ event }: MediaEventListItemProps) {
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <div className={styles.event} onClick={() => {
                setShowCard(!showCard);
            }}>{event.title}</div>
            <MediaEventCard showCard={showCard} setShowCard={setShowCard} event={event} />
        </>
    )
}

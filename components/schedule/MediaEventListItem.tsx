import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/MediaEventListItem.module.scss";
import MediaEventCard from "./MediaEventCard";
import { useState } from "react"
import { MediaType } from "../../data/media_type";
import { MdLocalMovies, MdVideogameAsset, MdTv } from "react-icons/md"

interface MediaEventListItemProps {
    event: MediaEvent
}

export default function MediaEventListItem({ event }: MediaEventListItemProps) {
    const [showCard, setShowCard] = useState(false);

    const onClick = () => {
        setShowCard(!showCard);
    }

    let div = null;
    switch (event.mediaType) {
        case MediaType.MOVIE:
            div = <div className={`${styles.event} ${styles.red}`} onClick={onClick}>{event.title}<MdLocalMovies className={styles.icon} /></div>;
            break;
        case MediaType.TV_SHOW:
            div = <div className={`${styles.event} ${styles.blue}`} onClick={onClick}>{event.title}<MdTv className={styles.icon} /></div>;
            break;
        case MediaType.VIDEO_GAME:
            div = <div className={`${styles.event} ${styles.green}`} onClick={onClick}>{event.title}<MdVideogameAsset className={styles.icon} /></div>;
            break;
    }

    return (
        <>
            {div}
            <MediaEventCard showCard={showCard} setShowCard={setShowCard} event={event} />
        </>
    )
}

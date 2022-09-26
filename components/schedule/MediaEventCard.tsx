import { MdLocalMovies, MdVideogameAsset, MdTv } from "react-icons/md"
import React from 'react'
import { MediaEvent } from '../../data/media_event'
import { MediaType } from '../../data/media_type'
import styles from "../../styles/components/schedule/MediaEventCard.module.scss"
import DateUtils from '../../util/date_utils'
import MediaSources from "../../data/sources/media_sources"

interface MediaEventCardProps {
    event: MediaEvent,
    showCard: boolean,
    setShowCard: Function
}

export default function MediaEventCard({ event, showCard, setShowCard }: MediaEventCardProps) {
    let icon = null;
    switch (event.mediaType) {
        case MediaType.MOVIE:
            icon = <MdLocalMovies className={styles.icon} size={25} />
            break;
        case MediaType.TV_SHOW:
            icon = <MdTv className={styles.icon} size={25} />;
            break;
        case MediaType.VIDEO_GAME:
            icon = <MdVideogameAsset className={styles.icon} size={25} />;
            break;
    }

    let dataSource = MediaSources.getElementForSource(event.source);

    return (
        <div className={styles.modal} style={{ display: showCard ? "block" : "none" }}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <span>
                        <h1 className={styles.event_title}>{event.title}</h1>
                        {icon}
                    </span>
                    <button onClick={() => { setShowCard(!showCard) }}>Close</button>
                </div>
                <div className={styles.event_content}>
                    <div className={styles.grid}>
                        {event.image ? <img className={styles.event_image} src={event.image} alt={`Image of ${event.title}`} /> : <></>}
                        <div className={styles.event_info}>
                            <h4>Description</h4>
                            <p>{event.description}</p>
                            {event.releaseDate ? <><h4>Release Date</h4><p>{DateUtils.formatDate(new Date(event.releaseDate))}</p></> : <></>}
                            <h4>Source of Data</h4>
                            {dataSource}
                            <a href={event.pageLink} target="_blank"><p className={styles.learnLink}>Learn More</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

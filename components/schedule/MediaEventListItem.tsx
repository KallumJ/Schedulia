import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/MediaEventListItem.module.scss";

interface MediaEventProps {
    event: MediaEvent
}

export default function MediaEventListItem({ event }: MediaEventProps) {
    return (
        <div className={styles.event}>{event.title}</div>
    )
}

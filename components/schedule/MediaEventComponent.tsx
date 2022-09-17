import { MediaEvent } from "../../data/media_event";
import styles from "../../styles/components/schedule/MediaEventComponent.module.scss";

interface MediaEventProps {
    event: MediaEvent
}

export default function MediaEventComponent({ event }: MediaEventProps) {
    return (
        <div className={styles.event}>{event.title}</div>
    )
}

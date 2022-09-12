import { MediaEvent } from "../media_event.js";

export interface MediaSource {
    getMediaSourceName(): string,
    getMediaEvents(month: Date): Promise<MediaEvent[]>
}
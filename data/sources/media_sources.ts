import TMDBSource from "./tmdb_source";
import { MediaSource } from "./media_source.js";
import { MediaEvent } from "../media_event.js";

export default class MediaSources {
    private static readonly SOURCES: MediaSource[] = [
        new TMDBSource()
    ]

    public static async getMediaEvents(month: Date) {
        let events: MediaEvent[] = [];

        for (const source of MediaSources.SOURCES) {
            const sourceEvents = await source.getMediaEvents(month);
            events = events.concat(sourceEvents)
        }
        return events;
    }
}
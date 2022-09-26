import TMDBSource from "./tmdb_source";
import { MediaSource } from "./media_source.js";
import { MediaEvent } from "../media_event.js";
import RawgSource from "./rawg_source";

export default class MediaSources {
    public static readonly SOURCES: MediaSource[] = [
        new TMDBSource(),
        new RawgSource()
    ]

    public static async getMediaEvents(month: Date) {
        let events: MediaEvent[] = [];

        for (const source of MediaSources.SOURCES) {
            const sourceEvents = await source.getMediaEvents(month);
            events = events.concat(sourceEvents)
        }
        return events;
    }

    public static getElementForSource(sourceStr: string) {
        for (let source of MediaSources.SOURCES) {
            if (source.getMediaSourceName() === sourceStr) {
                return source.getMediaSourceElement();
            }
        }
    }
}
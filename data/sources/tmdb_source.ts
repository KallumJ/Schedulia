import DateUtils from "../../util/date_utils";
import { MediaEvent } from "../media_event.js";
import { MediaSource } from "./media_source.js";
import { MovieDb } from "moviedb-promise";

export default class TMDBSource implements MediaSource {
    private static readonly DB: MovieDb = new MovieDb(process.env.TMDB_API_KEY || "")
    private static readonly POPULARITY_THRESHOLD: number = 30;
    private static readonly IMAGE_URL: string = "https://image.tmdb.org/t/p/original"

    getMediaSourceName(): string {
        return "TMDB";
    }
    async getMediaEvents(month: Date): Promise<MediaEvent[]> {
        const finalDate = new Date(month.getFullYear(), month.getMonth(), DateUtils.getDaysInMonth(month));
        let page = 1;
        let totalPages = Number.MAX_VALUE;
        let mediaEvents: MediaEvent[] = [];

        while (page < totalPages) {
            const params = {
                "api_key": process.env.TMDB_API_KEY,
                "with_original_language": "en",
                "include_adult": false,
                "primary_release_date.gte": DateUtils.formatDate(month),
                "primary_release_date.lte": DateUtils.formatDate(finalDate),
                page
            }

            const response = await TMDBSource.DB.discoverMovie(params)
            let results = response.results;

            totalPages = response.total_pages || totalPages;
            if (results != undefined) {
                results = results.filter(result => result.popularity && result.popularity > TMDBSource.POPULARITY_THRESHOLD)
                results.forEach(movie => {
                    const event: MediaEvent = {
                        title: movie.title,
                        description: movie.overview,
                        releaseDate: new Date(movie.release_date || ""),
                        image: `${TMDBSource.IMAGE_URL}${movie.backdrop_path}`
                    }

                    if (event.title != undefined) {
                        mediaEvents.push(event)
                    }
                })
            }

            page++;
        }

        return mediaEvents
    }

}
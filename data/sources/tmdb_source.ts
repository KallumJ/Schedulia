import DateUtils from "../../util/date_utils";
import { MediaEvent } from "../media_event.js";
import { MediaSource } from "./media_source.js";
import { MovieDb, MovieResult } from "moviedb-promise";

export default class TMDBSource implements MediaSource {
    private static readonly DB: MovieDb = new MovieDb(process.env.TMDB_API_KEY || "")
    private static readonly IMAGE_URL: string = "https://image.tmdb.org/t/p/original"
    private static readonly HIGH_RESULTS_THRESHOLD: number = 100;
    private static readonly HIGH_POPULARITY_THRESHOLD: number = 30;
    private static readonly LOW_POPULARITY_THRESHOLD: number = 4;
    private static readonly VOTE_COUNT_THRESHOLD: number = 3;

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
                results = results.filter(result => result.popularity && result.popularity > TMDBSource.getPopularityThreshold(response.total_results))
                results.forEach(movie => {
                    if (TMDBSource.isValidMovie(movie, response.total_results)) {
                        const event: MediaEvent = {
                            title: movie.title,
                            description: movie.overview,
                            releaseDate: movie.release_date,
                            image: `${TMDBSource.IMAGE_URL}${movie.backdrop_path}`
                        }

                        mediaEvents.push(event);
                    }
                })
            }

            page++;
        }

        return mediaEvents
    }
    static isValidMovie(movie: MovieResult, totalResults: number | undefined) {
        totalResults = totalResults ? totalResults : 0;
        const popularityThreshold = totalResults > TMDBSource.HIGH_RESULTS_THRESHOLD ? TMDBSource.HIGH_POPULARITY_THRESHOLD : TMDBSource.LOW_POPULARITY_THRESHOLD;

        if (popularityThreshold == TMDBSource.HIGH_POPULARITY_THRESHOLD) {
            if (movie.vote_count && movie.vote_count < TMDBSource.VOTE_COUNT_THRESHOLD) {
                return false;
            }
        }

        return movie.popularity && movie.popularity > popularityThreshold;
    }
    static getPopularityThreshold(total_results: number | undefined) {
        if (total_results && total_results > 100) {
            return 30;
        } else {
            return 4;
        }
    }

}
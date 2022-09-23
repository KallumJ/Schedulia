import DateUtils from "../../util/date_utils";
import { MediaEvent } from "../media_event.js";
import { MediaSource } from "./media_source.js";
import { MovieDb, MovieResult, TvResult } from "moviedb-promise";
import { MediaType } from "../media_type";

export default class TMDBSource implements MediaSource {
    private static readonly DB: MovieDb = new MovieDb(process.env.TMDB_API_KEY || "")
    private static readonly IMAGE_URL: string = "https://image.tmdb.org/t/p/original"
    private static readonly HIGH_RESULTS_THRESHOLD: number = 100;
    private static readonly HIGH_POPULARITY_THRESHOLD: number = 30;
    private static readonly LOW_POPULARITY_THRESHOLD: number = 4;
    private static readonly VOTE_COUNT_THRESHOLD: number = 1;

    getMediaSourceName(): string {
        return "TMDB";
    }
    async getMediaEvents(month: Date): Promise<MediaEvent[]> {
        let mediaEvents: MediaEvent[] = [];
        let movieResults = await this.getMovieResults(month);
        let tvResults = await this.getTvResults(month);

        for (let movieResult of movieResults) {
            mediaEvents.push({
                id: movieResult.id?.toString(),
                title: movieResult.title,
                description: movieResult.overview,
                releaseDate: movieResult.release_date,
                image: movieResult.backdrop_path ? `${TMDBSource.IMAGE_URL}${movieResult.backdrop_path}` : undefined,
                source: this.getMediaSourceName(),
                mediaType: MediaType.MOVIE
            })
        }

        for (let tvResult of tvResults) {

            mediaEvents.push({
                id: tvResult.id?.toString(),
                title: tvResult.name,
                description: tvResult.overview,
                releaseDate: tvResult.first_air_date,
                image: tvResult.backdrop_path ? `${TMDBSource.IMAGE_URL}${tvResult.backdrop_path}` : undefined,
                source: this.getMediaSourceName(),
                mediaType: MediaType.TV_SHOW
            });
        }

        return mediaEvents
    }

    async getTvResults(month: Date) {
        const totalPages = await this.getTvTotalPages(month);
        const totalResponses = await this.getTvTotalResponses(month);

        const results = []
        if (totalPages) {
            for (let i = 1; i <= totalPages; i++) {
                const page = await this.getTvPage(i, month);
                if (page) {
                    for (let show of page) {
                        if (TMDBSource.isValidMedia(show, totalResponses)) {
                            results.push(show)
                        }
                    }
                }
            }
        }

        return results;
    }

    async getMovieResults(month: Date) {
        const totalPages = await this.getMovieTotalPages(month);
        const totalResponses = await this.getMovieTotalResponses(month);

        const results = []
        if (totalPages) {
            for (let i = 1; i <= totalPages; i++) {
                const page = await this.getMoviePage(i, month);
                if (page) {
                    for (let movie of page) {
                        if (TMDBSource.isValidMedia(movie, totalResponses)) {
                            results.push(movie)
                        }
                    }
                }
            }
        }

        return results;
    }
    async getMovieTotalResponses(month: Date) {
        const response = await TMDBSource.DB.discoverMovie(this.getMovieParams(1, month))
        return response.total_results;
    }

    async getTvTotalResponses(month: Date) {
        const response = await TMDBSource.DB.discoverTv(this.getTVParams(1, month))
        return response.total_results;
    }

    async getMovieTotalPages(month: Date) {
        const response = await TMDBSource.DB.discoverMovie(this.getMovieParams(1, month))
        return response.total_pages;
    }

    async getTvTotalPages(month: Date) {
        const response = await TMDBSource.DB.discoverTv(this.getTVParams(1, month))
        return response.total_pages;
    }

    async getMoviePage(pageNum: number, month: Date): Promise<MovieResult[] | undefined> {
        const response = await TMDBSource.DB.discoverMovie(this.getMovieParams(pageNum, month))
        return response.results;
    }

    async getTvPage(pageNum: number, month: Date): Promise<TvResult[] | undefined> {
        const response = await TMDBSource.DB.discoverTv(this.getTVParams(pageNum, month));
        return response.results;
    }

    getTVParams(pageNum: number, month: Date) {
        const finalDate = DateUtils.getFinalDateInMonth(month);

        const params = {
            "with_original_language": "en",
            "include_adult": false,
            "first_air_date.gte": DateUtils.formatDate(month),
            "first_air_date.lte": DateUtils.formatDate(finalDate),
            "include_null_first_air_dates": false,
            "page": pageNum
        }

        return params;
    }

    getMovieParams(pageNum: number, month: Date) {
        const finalDate = DateUtils.getFinalDateInMonth(month);

        const params = {
            "with_original_language": "en",
            "include_adult": false,
            "primary_release_date.gte": DateUtils.formatDate(month),
            "primary_release_date.lte": DateUtils.formatDate(finalDate),
            "page": pageNum
        }

        return params;
    }
    static isValidMedia(media: MovieResult | TvResult, totalResults: number | undefined) {
        totalResults = totalResults ? totalResults : 0;
        const popularityThreshold = totalResults > TMDBSource.HIGH_RESULTS_THRESHOLD ? TMDBSource.HIGH_POPULARITY_THRESHOLD : TMDBSource.LOW_POPULARITY_THRESHOLD;

        if (popularityThreshold == TMDBSource.HIGH_POPULARITY_THRESHOLD) {
            if (media.vote_count && media.vote_count < TMDBSource.VOTE_COUNT_THRESHOLD) {
                return false;
            }
        }

        return media.popularity && media.popularity > popularityThreshold;
    }
}
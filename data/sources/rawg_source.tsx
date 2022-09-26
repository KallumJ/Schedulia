import { MediaEvent } from "../media_event.js";
import { MediaSource } from "./media_source.js";
import axios, { AxiosResponse } from "axios";
import DateUtils from "../../util/date_utils";
import { MediaType } from "../media_type";
import Image from "next/image.js";

export default class RawgSource implements MediaSource {
    private static readonly BASE_URL: string = "https://api.rawg.io/api";
    private static readonly GAMES_ENDPOINT: string = `${this.BASE_URL}/games`
    private static readonly RATINGS_THRESHOLD: number = 2;

    getMediaSourceName(): string {
        return "RAWG";
    }
    getMediaSourceElement(): JSX.Element {
        return <div>
            <a href="https://rawg.io/" target="_blank"><Image src="/logos/rawg_logo.png" width="100" height="100" /></a>
        </div>;
    }
    async getMediaEvents(month: Date): Promise<MediaEvent[]> {
        let mediaEvents: MediaEvent[] = [];

        let next: string | null = `
        ${RawgSource.GAMES_ENDPOINT}?key=${process.env.RAWG_API_KEY}&dates=${DateUtils.formatDate(month)},${DateUtils.formatDate(DateUtils.getFinalDateInMonth(month))}&parent_platforms=1,2,3&stores=1,3,2,5,6,11`;
        let results: Game[] = [];
        do {
            const response: AxiosResponse<any, any> = await axios.get(next)
            const data = await response.data;

            next = data.next;

            results = results.concat(data.results.filter((game: Game) => game.ratings_count >= RawgSource.RATINGS_THRESHOLD))
        } while (next != null);

        for (let game of results) {
            mediaEvents.push({
                id: `${game.id}`,
                title: game.name,
                releaseDate: game.released,
                description: await this.getGameDescription(game.id),
                image: game.background_image,
                source: this.getMediaSourceName(),
                mediaType: MediaType.VIDEO_GAME
            })
        }

        return mediaEvents;
    }
    async getGameDescription(id: number): Promise<string> {
        const response = await axios.get(`${RawgSource.GAMES_ENDPOINT}/${id}`, { params: { "key": process.env.RAWG_API_KEY } })
        const data = await response.data;
        return data.description_raw;
    }

}

interface Game {
    slug: string;
    name: string;
    playtime: number;
    platforms: any[];
    stores: any[];
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: any[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: any;
    metacritic: number;
    suggestions_count: number;
    updated: Date;
    id: number;
    score?: any;
    clip?: any;
    tags: any[];
    esrb_rating?: any;
    user_game?: any;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    short_screenshots: any[];
    parent_platforms: any[];
    genres: any[];
}
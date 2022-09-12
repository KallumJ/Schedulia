import { MediaEvent } from "./media_event.js";

export interface MonthData {
    startingDate: Date,
    events: Array<MediaEvent>
}
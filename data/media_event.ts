import { MediaType } from "./media_type.js"

export interface MediaEvent {
    id?: string
    title?: string
    releaseDate?: string
    description?: string
    image?: string
    source: string
    mediaType: MediaType
    pageLink: string
}
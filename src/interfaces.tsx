export interface Track {
    name: string,
    spotifyURI: string,
    playCount: number
}

export interface Album {
    name: string,
    tracks: Array<Track>,
    coverURI: string
}

export interface Artist {
    name: string,
    msPlayed: number,
    albums: Array<Album>,
    totalPlayCount: number
}
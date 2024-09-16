export interface Artist {
    name: string,
    msPlayed: number,
    albums: Album[],
    totalPlayCount: number
}

export interface Track {
    name: string,
    spotifyURI: string,
    playCount: number,
    album: Album,
    artist: Artist
    timesPlayed: string[]
}

export interface Album {
    name: string,
    tracks: Track[],
    coverURI: string
    albumPlayCount: number
}

export interface Stream {
    duration: number
    trackName: string
    artistName: string
    albumName: string
    spotifyURI: string
    timestamp: string
}
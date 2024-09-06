export interface Artist {
    name: string,
    msPlayed: number,
    albums: Array<Album>,
    totalPlayCount: number
}

export interface Track {
    name: string,
    spotifyURI: string,
    playCount: number,
    album: Album,
    artist: Artist
}

export interface Album {
    name: string,
    tracks: Array<Track>,
    coverURI: string
    albumPlayCount: number
}

export interface Stream {
    duration: number
    trackName: string
    artistName: string
    albumName: string
    spotifyURI: string
}
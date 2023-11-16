export class Artist {
    name: string
    msPlayed: number
    albums: Album[]
    totalPlayCount: number

    constructor(name: string) {
        this.name = name
        this.msPlayed = 0
        this.albums = []
        this.totalPlayCount = 0
    }
}

export class Album {
    name: string
    tracks: Track[]
    coverURI: string

    constructor(name: string) {
        this.name = name
        this.tracks = []
        this.coverURI = ""
    }
}
 
export class Track {
    name: string
    spotifyURI: string
    playCount: number

    constructor(name: string, URI: string) {
        this.name = name
        this.spotifyURI = URI
        this.playCount = 0
    }
}
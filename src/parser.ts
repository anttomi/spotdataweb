import { Album, Track, Artist } from "./Classes"
import { Stream } from "./interfaces"

/**
 * @brief Parse all data, data is json files as string.
 * @param {string[]} files
 * @param {number} threshold 
 * @returns {Artist[]}
 */

export function collectStreamData(files: string[], threshold: number): Artist[] {

    const streamData: Artist[] = []

    files.forEach((fd) => {  
        
        const streamJSON: Object = JSON.parse(fd)

        Object.values(streamJSON).forEach((stream: Record<string, any>, i: number) => {

            const cs: Stream = {
                duration: stream["ms_played"],
                trackName: stream["master_metadata_track_name"],
                artistName: stream["master_metadata_album_artist_name"],
                albumName: stream["master_metadata_album_album_name"],
                spotifyURI: stream["spotify_track_uri"]
            }

            let artist: Artist | undefined = streamData.find((a: Artist) => a.name === cs.artistName)

            if (!artist) {
                let tempArtist: Artist = new Artist(cs.artistName)
                streamData.push(tempArtist)
                artist = tempArtist
            }

            let album: Album | undefined = artist.albums.find((album: Album) => album.name === cs.albumName)

            if (!album) {
                let tempAlbum: Album = new Album(cs.albumName)
                artist.albums.push(tempAlbum)
                album = tempAlbum
            }

            let track: Track | undefined = album.tracks.find((track: Track) => track.name === cs.trackName)

            if (!track) {
                let tempTrack: Track = new Track(cs.trackName, cs.spotifyURI)
                album.tracks.push(tempTrack)
                track = tempTrack
            }

            if (cs.duration >= threshold) {
                artist.msPlayed += cs.duration
                //Could be counted afterwards from Tracks or could be implemented in classes
                artist.totalPlayCount += 1
                track.playCount += 1
            }
        })
    })
    
    return streamData
}
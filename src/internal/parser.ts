import { Album, Track, Artist } from "./classes"
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
        const streamJSON: Object = JSON.parse(fd);

        Object.values(streamJSON).forEach((stream: Record<string, any>, i: number) => {
            const cs: Stream = {
                duration: stream["ms_played"],
                trackName: stream["master_metadata_track_name"],
                artistName: stream["master_metadata_album_artist_name"],
                albumName: stream["master_metadata_album_album_name"],
                spotifyURI: stream["spotify_track_uri"],
            };

            if (cs.duration < threshold)
                return;

            let artist: Artist | undefined = streamData.find((a: Artist) => a.name === cs.artistName);

            if (!artist) {
                artist = new Artist(cs.artistName);
                streamData.push(artist);
            }

            let album: Album | undefined = artist.albums.find((album: Album) => album.name === cs.albumName);

            if (!album) {
                album = new Album(cs.albumName);
                artist.albums.push(album);
            }

            let track: Track | undefined = album.tracks.find((track: Track) => track.name === cs.trackName);

            if (!track) {
                track = new Track(cs.trackName, cs.spotifyURI);
                album.tracks.push(track);
            }

            
            artist.msPlayed += cs.duration;
            artist.totalPlayCount += 1;
            album.albumPlayCount += 1;
            track.playCount += 1;
            
        });
    });
    
    return streamData
}
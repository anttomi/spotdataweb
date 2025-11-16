import { useEffect, useState } from "react";
import { Artist, Album, Track } from "../internal/interfaces.ts";
import { shortenName } from "../internal/misc.ts";
import '../styles/SummaryTopSongs.css';

export default function SummaryTopSongs({ artists }: { artists: Artist[] }): JSX.Element {

    const [topSongs, setTopSongs] = useState<Track[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const calculateTopSongs = (artists: Artist[]): Track[] => {
        const allTracks: Track[] = artists.flatMap(artist => artist.albums).flatMap(album => album.tracks)
        const topSongs: Track[] = allTracks.sort((a, b) => b.playCount - a.playCount).slice(0, 10)
        return topSongs
    }

    useEffect(() => {
        if (!open) {
            return
        }
        setTopSongs(calculateTopSongs(artists))
    }, [open])

    if (artists.length < 1) {
        return (
            <>
            </>
        )
    }

    return (
        <div className="SummaryTopSongs-Main">
            <div className="SummaryTopSongs-Header">
                <h1>Top Songs</h1>
                <button onClick={() => {
                    setOpen(!open);
                }}>{open ? "Close" : "Open"}</button>       
            </div>
            <div className="SummaryTopSongs-Body">
                {open &&
                    <table>
                        <thead>
                            <tr>
                                <th>Track</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Streams</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSongs.map((track, key) => (
                                <tr key={key} className="SummaryTopSongs-Track">
                                    <td title={track.name}>{shortenName(track.name)}</td>
                                    <td>{track.artist.name}</td>
                                    <td title={track.album.name}>{shortenName(track.album.name)}</td>
                                    <td>{track.playCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
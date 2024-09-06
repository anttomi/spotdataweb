import { Album } from "./internal/interfaces";
import { shortenName } from "./internal/misc";
import "./styles/ArtistMost.css"

export default function ArtistMost({ albums }: { albums: Album[] }): JSX.Element {
    return (
        <div className="ArtistMost-Main">
            <div className="ArtistMost-Header">
            </div>
            <div className="ArtistMost-Body">
                <table className="ArtistMost-Combiner">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table className="ArtistMost-Albums">
                                    <thead>
                                        <tr>
                                            <th>Album</th>
                                            <th>Streams</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {albums.sort((a, b) => b.albumPlayCount - a.albumPlayCount).slice(0, 5).map((album, key) => (
                                            <tr key={key} className="ArtistMost-Album">
                                                <td title={album.name}>{shortenName(album.name)}</td>
                                                <td>{album.albumPlayCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className="ArtistMost-Tracks">
                                    <thead>
                                        <tr>
                                            <th>Track</th>
                                            <th>Streams</th>
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        {albums.flatMap(album => album.tracks).sort((a, b) => b.playCount - a.playCount).slice(0, 5).map((track, key) => (
                                            <tr key={key} className="ArtistMost-Track">
                                                <td title={track.name}>{shortenName(track.name)}</td>
                                                <td>{track.playCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
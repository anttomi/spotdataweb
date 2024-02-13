import { Track, Album } from "./internal/interfaces";
import "./styles/AlbumCard.css"

export default function AlbumCard({ album }: { album: Album }): JSX.Element {
    return (
        <div className="Album-Container">
            <div style={{width: "100%"}}>
                <h4>
                    {album.name}
                </h4>
                <table className="Track-Row">
                    <thead>
                        <tr>
                            <th>
                                {"Song Name"}
                            </th>
                            <th>
                                {"Stream count"}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {album.tracks.sort((a, b) => b.playCount - a.playCount).map((track: Track, key) => (
                            <tr key={key}>
                                <td>
                                    {track.name}
                                </td>
                                <td>
                                    {track.playCount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <p>
                    Total playcount: {album.albumPlayCount}
                </p>
            </div>

        </div>
    )
}

import { Album } from "./Classes";
import "./AlbumCard.css"
import { Track } from "./interfaces";

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
                        {album.tracks.sort((a, b) => b.playCount - a.playCount).map((track: Track) => (
                            <tr>
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
                Total playcount: {album.albumPlayCount}
            </div>

        </div>
    )
}

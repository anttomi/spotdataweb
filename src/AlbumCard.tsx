import { Album } from "./Classes";
import "./AlbumCard.css"

export default function AlbumCard({ album }: { album: Album }): JSX.Element {
    return (
        <div className="Album-Container">
            <div>
                {album.name}
            </div>
            <div>
                {album.tracks.reduce((acc, current) => acc + current.playCount, 0)}
            </div>
        </div>
    )
}

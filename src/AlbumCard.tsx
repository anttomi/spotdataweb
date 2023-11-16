import { Album } from "./Classes";

export default function AlbumCard({album}: {album: Album}): JSX.Element {
    return (
        <div>
            {album.name}
        </div>
    )
}

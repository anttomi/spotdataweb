import { Artist, Album } from "./interfaces";
import "./ArtistView.css"
import { useState } from "react";
import AlbumCard from "./AlbumCard";

export default function ArtistView({artist}: {artist: Artist}): JSX.Element {

    const [open, setOpen] = useState(false)

    return (
        <div className="Artist-Container" onClick={() => {setOpen(prev => !prev)}}>
            <div className="Artist-Upper">
       
                <p className="Artist-Name" >{artist.name}</p>
                
                <div className="Artist-Upper-Right">
                    <p className="Artist-Played">{(artist.msPlayed / 3_600_000).toFixed(2)} h</p>
                    <p className="Artist-TotalPlayCount">{artist.totalPlayCount} streams</p>
                </div>
            </div>
            <div className="Artist-Middle">
                
                <span>
                    {`Streams from ${artist.albums.length} album${artist.albums.length>1 ? "s" : ""}`} 
                </span>
            </div>
            <div className="Artist-Bottom">
                <div>
                  
                </div>
            </div>
            {open &&
                <div>
                    {artist.albums.map((album: Album, key) => (
                        <AlbumCard album={album} key={key}/>
                    ))}
                </div>
            }
        </div>
    )
}
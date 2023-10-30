import React from "react";
import { Artist, Album } from "./interfaces";
import "./ArtistView.css"

export default function ArtistView({artist}: {artist: Artist}): JSX.Element {
    return (
        <div className="Artist-Container">
            <div className="Artist-Upper">
       
                <p className="Artist-Name" >{artist.name}</p>
                
                <div className="Artist-Upper-Right">
                    <p className="Artist-Played">{(artist.msPlayed / 3_600_000).toFixed(2)} h</p>
                    <p className="Artist-TotalPlayCount">{artist.totalPlayCount} streams</p>
                </div>
            </div>
            <div className="Artist-Middle">
                
                <span>
                    Album count: {artist.albums.length}
                </span>
            </div>
            <div className="Artist-Bottom">
                <div>
                  
                </div>
            </div>
        </div>
    )
}
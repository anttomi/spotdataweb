import { LegacyRef, useEffect, useRef, useState } from "react"
import { SpotApi } from "./SpotApi"
import { Artist } from "./interfaces"
import './FileParser.css'

export default function FileParser() {

    const [streamingData, setStreamingData] = useState(Array<Artist>)

    const onFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        
        SpotApi.getParsedData(e.target.files)
        .then((r) => {
            console.log(r)
            setStreamingData(r.streamingData)
        })
        .catch((e) => console.error(e))
    }

    const openArtist = () => {
        
    }

    return (
        <div>
            <input type="file" name="fileInput" multiple accept={".json"} onChange={onFileLoad}></input>
            {streamingData && 
                streamingData.map((artist:Artist,key) => (
                    <div key={key} className="Artist-Container" onClick={openArtist}>
                        <div className="Artist-Upper">
                            <p className="Artist-Name" >{artist.name}</p>
                            <p className="Artist-Played">{(artist.msPlayed/1000/60).toFixed(2)}h</p>
                        </div>
                        <div className="Artist-Middle">

                        </div>
                        <div className="Artist-Bottom">

                        </div>
                    </div>

                ))
            }
        </div>
    )
}
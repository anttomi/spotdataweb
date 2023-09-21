import { LegacyRef, useEffect, useRef, useState } from "react"
import { SpotApi } from "./SpotApi"
import { Artist } from "./interfaces"

export default function FileParser() {

    const [streamingData, setStreamingData] = useState(Array<Artist>)

    const onFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        
        SpotApi.parseData(e.target.files)
        .then((r) => {
            console.log(r)
            setStreamingData(r.streamingData)
        })
        .catch((e) => console.error(e))
    }

    return (
        <div>
            <input type="file" name="fileInput" multiple accept={".json"} onChange={onFileLoad}></input>
            {streamingData && 
                streamingData.map((artist:Artist,key) => (
                    <p key={key}>{artist.name}</p>
                ))
            }
        </div>
    )
}
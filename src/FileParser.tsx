import { FunctionComponent, useEffect, useState } from "react"
import { Artist } from "./interfaces"
import './FileParser.css'
import { collectStreamData } from "./parser"

const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(file)

        fileReader.onload = () => {
            resolve(fileReader.result as string)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

const FileParser: FunctionComponent = () => {

    const [streamingData, setStreamingData] = useState<Array<Artist>>([])
    const [loading, setLoading] = useState<Boolean>()

    const onFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        setLoading(() => true)

        //Read all files
        const fileArray: Promise<string>[] = []

        Array.from(e.target.files).forEach((file) => {
            fileArray.push(getBase64(file))
        })

        Promise.all(fileArray).then((r) => {
            console.log(collectStreamData(r, 5000))
            setStreamingData(collectStreamData(r, 5000))
            setLoading(() => false)
        })
    }

    const openArtist = (artist: Artist) => {
 
    }

    return (
        <div>
            <div className="Inputs">
                <label htmlFor="fileInput">Select files: </label>
                <input type="file" name="fileInput" multiple accept={".json"} onChange={onFileLoad}></input>
            </div>
            {loading === false ?
                streamingData.map((artist: Artist, key) => (
                    <div key={key} className="Artist-Container" onClick={() => openArtist(artist)}>
                        <div className="Artist-Upper">
                            <p className="Artist-Name" >{artist.name}</p>
                            <div className="Artist-Upper-Right">
                                <p className="Artist-Played">{(artist.msPlayed / 3_600_000).toFixed(2)} h</p>
                                <p className="Artist-TotalPlayCount">{artist.totalPlayCount} streams</p>
                            </div>
                        </div>
                        <div className="Artist-Middle">

                        </div>
                        <div className="Artist-Bottom">

                        </div>
                    </div>
                ))
                : loading === undefined ? <></> : <div>Loading...</div>}
        </div>

    )
}

export default FileParser
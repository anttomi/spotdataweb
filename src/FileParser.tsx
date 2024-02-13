import { FunctionComponent, useRef, useState } from "react"
import { Artist } from "./internal/interfaces"
import './styles/FileParser.css'
import { collectStreamData } from "./internal/parser"
import ArtistView from "./ArtistView"
import Paginator from "./Paginator"

interface FormElements extends HTMLFormElement {
    threshold: HTMLInputElement;
}

const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsText(file, "utf-8")

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

    //Tools height about 206,5 when small screen, magic number
    const itemCount = Math.floor((window.innerHeight-206) / 90)

    const onFileLoad = (files: FileList, threshold: number) => {

        if (files.length < 1) return

        setLoading(() => true)

        const fileArray: Promise<string>[] = []

        //Read all files
        Array.from(files).forEach((file) => {
            fileArray.push(getBase64(file))
        })

        Promise.all(fileArray).then((r) => {
            setStreamingData(collectStreamData(r, threshold).filter((a: Artist) => a.totalPlayCount !== 0).sort((a, b) => b.msPlayed - a.msPlayed))
            setLoading(() => false)
        })
    }

    return (
        <div className="Main-Content">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formValues = e.target as FormElements
                onFileLoad(
                    formValues.fileInput.files,
                    Number(formValues.threshold.value),
                )
            }}
                className="Inputs"
                >
                <div>
                    <label htmlFor="fileInput">Select files:</label>
                    <input type="file" name="fileInput" multiple accept={".json"} />
                </div>
                <div>
                    <label htmlFor="threshold">Stream threshold (ms):</label>
                    <input type="number" defaultValue={5000} name="threshold"></input>
                </div>

                <input type="submit" ></input>
            </form>

            {loading === false ?
                <Paginator pageSize={itemCount}>
                    {streamingData.map((artist: Artist, key) => (
                        <ArtistView artist={artist} key={key}/>
                    ))}
                </Paginator>
                : loading === undefined ? <></> : <div>Loading...</div>
            }
        </div>

    )
}

export default FileParser
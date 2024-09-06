import { FunctionComponent, useRef, useState } from "react"
import { Artist } from "./internal/interfaces"
import './styles/FileParser.css'
import { collectStreamData } from "./internal/parser"
import ArtistView from "./ArtistView"
import Paginator from "./Paginator"
import { generateRandomStreams } from "./internal/datagenerator"
import SummaryTopSongs from "./summary/SummaryTopSongs"
import SummaryMain from "./summary/SummaryMain"

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

    //Tools height about 206,5, bottom tools about 90 when small screen, magic number
    const itemCount = Math.floor((window.innerHeight-206-90) / 90)

    const onFileLoad = (files: FileList, threshold: number, useExampleData: boolean = false) => {

        //Set loading indicator
        setLoading(() => true)

        //If using example data
        if (useExampleData) {
            setStreamingData(
                collectStreamData([JSON.stringify(generateRandomStreams(50000))], threshold)
                    .filter((a: Artist) => a.totalPlayCount !== 0)
                    .sort((a, b) => b.msPlayed - a.msPlayed)
            )
            setLoading(() => false)
            return
        }

        //Trying to submit zero files
        if (files.length < 1) {
            setLoading(() => undefined)
            return
        }               

        const fileArray: Promise<string>[] = []

        //Read all files
        Array.from(files).forEach((file) => {
            fileArray.push(getBase64(file))
        })

        Promise.all(fileArray).then((r) => {
            setStreamingData(collectStreamData(r, threshold)
                .filter((a: Artist) => a.totalPlayCount !== 0)
                .sort((a, b) => b.msPlayed - a.msPlayed))
            setLoading(() => false)
        }).catch((e) => {
            console.error(e)
            setLoading(() => undefined)
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
                    formValues.useExampleData.checked
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
                <div>
                    <label htmlFor="exampleData">Using example data:</label>
                    <input type="checkbox" name="useExampleData"></input>
                </div>
                <input type="submit" ></input>
            </form>

            {streamingData.length > 0 ?
                <Paginator pageSize={itemCount}>
                    {streamingData.map((artist: Artist, key) => (
                        <ArtistView artist={artist} key={key}/>
                    ))}
                </Paginator>
                : loading === undefined ? <></> : <div>Loading...</div>
            }

            <SummaryMain    
                artists={streamingData}
            />
        </div>

    )
}

export default FileParser
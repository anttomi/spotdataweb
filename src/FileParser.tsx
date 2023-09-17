import { LegacyRef, useEffect, useRef, useState } from "react"
import { SpotApi } from "./SpotApi"

export default function FileParser() {

    const onFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        
        SpotApi.parseData(e.target.files)
        .then((r) => {
            console.log(r)
        })
    }

    return (
        <div>
            <input type="file" name="fileInput" multiple accept={".json"} onChange={onFileLoad}></input>
        </div>
    )
}
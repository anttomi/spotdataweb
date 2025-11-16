import { useEffect, useState } from "react"
import { Artist } from "../internal/interfaces.ts"
import { Bar } from "../pylon/Bar.tsx"
import "../styles/SummaryTimeChart.css"

export default function SummaryTimeChart({ artists }: { artists: Artist[] }): JSX.Element {

    const [barData, setBarData] = useState<{ [key: string]: number }>({})
    const [open, setOpen] = useState<boolean>(false)

    const calculateTimeChart = (artists: Artist[]): { [key: string]: number } => {

        const headerData: { [key: string]: number } = {}

        const tracks = artists.flatMap(artist => artist.albums).flatMap(album => album.tracks)

        // Initialize the header data for each hour to skip the comparison in loop 
        Array.from({ length: 24 }, (_, i) => i).forEach(hour => {
            headerData[hour] = 0
        })

        // Count plays per hour
        tracks.forEach(track => {
            track.timesPlayed.forEach(time => {
                headerData[new Date(time).getHours()] += 1
            })
        })

        return headerData
    }

    useEffect(() => {
        if (!open) {
            return
        }
        setBarData(calculateTimeChart(artists))
    }, [open])

    if (artists.length < 1) {
        return (
            <>
            </>
        )
    }

    return (
        <div >
            <div className="SummaryTimeChart-Header">
                <h1>Time Chart</h1>
                <button onClick={() => {
                    setOpen(!open);
                    
                }}>{open ? "Close" : "Open"}</button>
            </div>
            <div className="SummaryTimeChart-Main">
                {open &&
                    Object.entries(barData).map(([key, value], i) => (
                        <div key={i} className="SummaryTimeChart-Bar">
                            <Bar key={i} count={value} />
                            <span className="SummaryTimeChart-Hour-Label">{key}:00</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
import { useEffect } from "react"
import { Artist } from "../internal/interfaces"

export default function SummaryTimeChart({ artists }: { artists: Artist[] }): JSX.Element {

    const calculateTimeChart = (artists: Artist[]): {[key: string]: number} => {

        const headerData: { [key: string]: number} = {}

        const tracks = artists.flatMap(artist => artist.albums).flatMap(album => album.tracks)

        // Initialize the header data for each our to skip the comparison in loop 
        Array.from({length: 24}, (_, i) => i).forEach(hour => {
            headerData[hour] = 0
        })

        tracks.forEach(track => {
            track.timesPlayed.forEach(time => {
                headerData[new Date(time).getHours()] += 1
            })
        })
 
        console.log(headerData)

        return headerData
    }

    useEffect(() => {
        calculateTimeChart(artists)
    }, [artists])

    return (
        <>
        </>
    )
}
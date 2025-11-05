import { Artist } from "../internal/interfaces.ts";
import SummaryTimeChart from "./SummaryTimeChart.tsx";
import SummaryTopSongs from "./SummaryTopSongs.tsx";

export default function SummaryMain({ artists } : { artists: Artist[] }): JSX.Element {
    return (
        <div className="SummaryMain">
            <SummaryTopSongs artists={artists}/>
            <SummaryTimeChart artists={artists}/>
        </div>
    )
}
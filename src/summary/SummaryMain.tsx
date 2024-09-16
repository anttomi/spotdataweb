import { Artist } from "../internal/interfaces";
import SummaryTimeChart from "./SummaryTimeChart";
import SummaryTopSongs from "./SummaryTopSongs";

export default function SummaryMain({ artists } : { artists: Artist[] }): JSX.Element {
    return (
        <div className="SummaryMain">
            <SummaryTopSongs artists={artists}/>
            <SummaryTimeChart artists={artists}/>
        </div>
    )
}
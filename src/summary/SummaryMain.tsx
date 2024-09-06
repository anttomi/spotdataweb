import { Artist } from "../internal/interfaces";
import SummaryTopSongs from "./SummaryTopSongs";

export default function SummaryMain({ artists } : { artists: Artist[] }): JSX.Element {
    return (
        <div className="SummaryMain">
            <SummaryTopSongs artists={artists}/>
        </div>
    )
}
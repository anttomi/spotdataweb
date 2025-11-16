import { useEffect, useState } from "react";
import { Artist } from "../internal/interfaces.ts";
import "../styles/SummaryDayGrid.css"
import Square from "../pylon/Square.tsx";
import { shortenName } from "../internal/misc.ts";

interface DayGridData {
    [key: string]: {[key: string]: {[key:string]: number}} 
}

const months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

export default function SummaryDayGrid({ artists }: { artists: Artist[] }): JSX.Element {

    const [dayGridData, setDayGridData] = useState<DayGridData>({})
    const [open, setOpen] = useState<boolean>(false)

    //Max of the days used to calculate better colors
    const [dayMax, setDayMax] = useState<number>(0)

    const calculateDayGrid = (artists: Artist[]): {data: DayGridData, max: number} => {

        const tracks = artists
            .flatMap(artist => artist.albums)
            .flatMap(album => album.tracks)

        const _dgData: DayGridData = {}

        let maxDay = 0;

        for (const track of tracks) {
            for (const time of track.timesPlayed) {
                const _d = new Date(time)

                if (!_dgData[_d.getFullYear()]) {
                    _dgData[_d.getFullYear()] = {}

                    //Initalize all days to get the empty days
                    Array.from({ length: 12 }, (_, i) => i).forEach(month => {
                        _dgData[_d.getFullYear()][month] = {}
                        const maxDaysInMonth = new Date(_d.getFullYear(), month+1, 0).getDate()                                                      
                        Array.from({ length: maxDaysInMonth }, (_x, ix) => ix).forEach(monthDay => {                                
                            _dgData[_d.getFullYear()][month][monthDay+1] = 0
                        })
                    })
                }

                _dgData[_d.getFullYear()][_d.getMonth()][_d.getDate()] += 1

                if (_dgData[_d.getFullYear()][_d.getMonth()][_d.getDate()] > maxDay) {
                    maxDay = _dgData[_d.getFullYear()][_d.getMonth()][_d.getDate()]
                }
            }
        }        
        
        return {data: _dgData, max: maxDay}
    }

    useEffect(() => {
        if (!open) {
            return
        }
        const _d = calculateDayGrid(artists)
        setDayGridData(_d.data)
        setDayMax(_d.max)
    }, [open])

    if (artists.length < 1) {
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <div className="SummaryDayGrid-Header">
                <h1>Day Grid</h1>
                <button onClick={() => {
                    setOpen(!open);
                }}>{open ? "Close" : "Open"}</button>
            </div>
            {
                open &&                
                <div className="SummaryDayGrid-Grid">
                    {Object.entries(dayGridData).map(([yearLabel, month], i) => (
                        <div key={`${yearLabel}_${i}`} className="SummaryDayGrid-Year">
                            <span className="SummaryDayGrid-Year-Header">
                                {yearLabel}
                            </span>
                            <div className="SummaryDayGrid-All-Months">
                                {Object.entries(month).map(([monthLabel, days], i) => (
                                    <div key={`${monthLabel}_${i}`} className="SummaryDayGrid-Month">
                                        <span className="SummaryDayGrid-Month-Header">
                                            {months[Number(monthLabel)]}
                                        </span>
                                        <div className="SummaryDayGrid-Month-Squares">
                                            {Object.entries(days).map(([dayLabel, day], i) => (
                                                <Square key={`${dayLabel}_${i}`} dayMax={dayMax} label={new Date(`${yearLabel}-${Number(monthLabel)+1}-${dayLabel}`).toDateString()} count={day} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
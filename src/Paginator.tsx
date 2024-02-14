import { Children, ReactNode, createElement, useEffect, useRef, useState } from "react"
import "./styles/Paginator.css"

//Odd numbers work better
const navNumbers = 11

export default function Paginator({ children, pageSize }: { children: React.ReactNode, pageSize: number }): JSX.Element {

    const [displayed, setDisplayed] = useState<ReactNode[]>([])

    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        const totalChildren = Children.toArray(children)

        const childrenChopped: ReactNode[] = []

        for (let i = 0; i < totalChildren.length; i++) {

            if (i + pageSize > totalChildren.length) {
                const diff = totalChildren.length - i
                childrenChopped.push(totalChildren.slice(i, i + diff))
                break
            }

            childrenChopped.push(totalChildren.slice(i, i + pageSize))

            i += pageSize - 1
        }

        setDisplayed(childrenChopped)

    }, [])

    const navPage = (val: number): void => {
        //Checks that we are not going out of bounds
        if (displayed.length <= page + val || page + val < 0) {
            return
        }

        console.log("Page", page + val)
        setPage(prev => prev + val)
    }

    return (
        <div className="Paginator-Container">
            <div>
                {displayed &&
                    displayed[page]
                }
            </div>
            <div className="Page-Navigation">

                <button onClick={() => navPage(-1)}>{"<"}</button>
                <div className="Page-Button-Container">

                    {
                        //TODO: refacture this to something nice looking
                        page > Math.floor(navNumbers/2) ?
                        Array.prototype.concat(
                            [...Array(Math.floor((navNumbers+1)/2))].map((p, key) => (
                                <div className="Page-Button" key={key + Math.random()} onClick={() => navPage(-key)}>
                                    {page - key + 1}
                                </div>
                            )).reverse().slice(0, -1),
                            [
                                <div className="Page-Button" style={{fontWeight: 'bold'}} key={Math.random()}>
                                    {page + 1}
                                </div>
                            ],
                            [...Array(Math.floor((navNumbers+1)/2))].map((p, key) => (
                                <div className="Page-Button" key={key + Math.random()} onClick={() => navPage(key)}>
                                    {page + key + 1}
                                </div>
                            )).slice(1)
                        )
                        : [...Array(navNumbers)].map((p, key) => (
                            <div className="Page-Button" style={{fontWeight: page === key ? 'bold' : 'initial' }} key={key + Math.random()} onClick={() => setPage(() => key)}>{key + 1}</div>
                        ))
                    }
                </div>
                <button onClick={() => navPage(1)}>{">"}</button>
            </div>

            <div className="Footer">
                
                <button onClick={() => setPage(0)}>{"First Page"}</button>
                
                <div>
                    On page: {page + 1}
                </div>
                <div>
                    
                    <div>
                        Total Rows: {Children.count(children)}

                    </div>
                    <div>
                        Total Pages: {displayed.length}
                    </div>
                </div>
            </div>

        </div>
    )

}
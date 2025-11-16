import "../styles/Square.css"

export default function Square({label, count, dayMax}: {label: string, count: number, dayMax: number}): JSX.Element {    

    const opacity = count > 0 ? 1 * Math.log(count) / Math.log(dayMax) : 0
    const green = count > 0 ? Math.floor(255 * Math.log(count) / Math.log(dayMax)) : 0   

    return (
        <div 
            className="Square-Day" 
            data-count={`${label} ${count} streams`}
            style={{
                backgroundColor: `rgb(${0},${green},${0},${opacity})`,
                borderColor: count === dayMax ? "gold" : "black",                
            }}
        >            
        </div>
    )
}
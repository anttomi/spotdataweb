import "../styles/Bar.css"

export function Bar({count}:{count: number}): JSX.Element {
    const height = Math.floor(count / 100) 
    const width = 20    
    return (
        <div className="Bar-Basic" data-count={`${count} streams`}>            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
                <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#23d100", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#009297", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#1a9c00", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#006b6b", stopOpacity: 1}} />
                </linearGradient>
                </defs>
                <rect x={0} y={0} />
            </svg>            
        </div>
    )
    
}
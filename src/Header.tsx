import "./styles/Header.css"

export default function Header({ navi }: {navi: React.Dispatch<React.SetStateAction<string>>}): JSX.Element {
    return (
        <div className="Header-Container">
            <h2>Spotify Data Parser</h2>
            <a href={"https://github.com/anttomi/spotdataweb"} target="_blank">
                <img src={"glogo.png"} style={{filter: "contrast(10%)"}} alt="github logo" height={32} width={32} />
            </a>
        </div>
    )
}
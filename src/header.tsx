import "./Header.css"

export default function Header(): JSX.Element {
    return (
        <div className="Header-Container">
            {/**
             * TODO: Make header only with layout and space-between, currently position absolute
             */}
            <h2>Spotify Data Parser</h2>
            <a href={"https://github.com/anttomi/spotdataweb"} target="_blank">
                <img src={"glogo.png"} style={{filter: "contrast(10%)"}} alt="github logo" height={32} width={32} />
            </a>
        </div>
    )
}
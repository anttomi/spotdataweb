export default function Header(): JSX.Element {
    return (
        <div className="Header-Container">
            {/**
             * TODO: Make header only with layout and space-between, currently position absolute
             */}
            <h1>Spotify Data Parser</h1>
            <img src={"glogo.png"} alt="github logo" height={32} width={32} />
        </div>
    )
}
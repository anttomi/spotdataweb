import "./styles/Footer.css";

export default function Footer(): JSX.Element {

    return (
        <footer>
            <div className="Footer-Container">
                <p>© {new Date().getFullYear()}</p>
                <p>Created by <a href="https://github.com/anttomi">anttomi</a></p>
            </div>
        </footer>
    )
}
import "./NotFound.scss"

export default function NotFound() {
    return (
        <div className="main-div" id="not-found">
            <img src="/images/Logo.jpg" alt="Logo" className="logo" />
            <h1>Oups... Vous vous êtes perdus ?</h1>
            <h2>Nous ne trouvons pas la ressource demandée</h2>
            <p>Réessayez peut-être plus tard...</p>
        </div>
    )
}
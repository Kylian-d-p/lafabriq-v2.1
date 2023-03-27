import "./Footer.scss"

export default function Footer() {
    return (
        <>
            <div id="footer">
                <p id="footer-txt" className="other-font">"Protégeons nos forêts, préservons la nature"</p>
                <div className="socials">
                    <a href="https://www.facebook.com/profile.php?id=100088563820421" rel="noreferrer" target="_blank"><img src="/images/facebook.svg" alt="Facebook" /></a>
                    <a href="https://instagram.com/lafabriq_" rel="noreferrer" target="_blank"><img src="/images/instagram.svg" alt="Instagram" /></a>
                </div>
            </div>
            <div id="fake-footer"></div>
        </>
    )
}
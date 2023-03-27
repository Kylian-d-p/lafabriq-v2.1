import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Navbar.scss"
import BurgerMenu from "../burger-menu/BurgerMenu"

export default function HeadBar() {
    const [boutiques, setboutiques] = useState<Array<Array<string>>>([])
    const [burgerMenuActive, setburgerMenuActive] = useState(false)

    useEffect(() => {
        fetch("/getCategories", { method: "POST" }).then(async (res) => {
            res.json().then((response) => {
                var boutiquesTemp = []
                for (const category of response) {
                    boutiquesTemp.push([category.display_name, "/boutique/" + category.name])
                }
                setboutiques(boutiquesTemp)
                document.getElementById("mobile-boutique-container")?.style.setProperty("--max-height-open", (boutiquesTemp.length * 75 - 50) + "px")
            })
        })
    }, [])

    const handleMobileMenuClick = () => {
        setburgerMenuActive(false)
        handleNavBarClick()
        for (let i = 0; i < document.getElementsByClassName("navbar").length; i++) {
            document.getElementsByClassName("navbar")[i].removeAttribute("boutique-active")
        }
    }

    const handleNavBarClick = () => {
        window.scrollTo(0, 0)
    }

    const handleBoutiqueClick = () => {
        for (let i = 0; i < document.getElementsByClassName("navbar").length; i++) {
            document.getElementsByClassName("navbar")[i].toggleAttribute("boutique-active")
        }
    }

    return (
        <>
            <div className="fake-nav-bar"></div>
            <div id="burger-menu-big-container" className="navbar-bg-blur navbar"><div id="burger-menu-container"><Link id="navbar-mobile-title-button" to="/"><h1 id="navbar-mobile-title">LaFabriq</h1></Link><BurgerMenu active={burgerMenuActive} setactive={setburgerMenuActive} /></div></div>
            <nav id="navbar-mobile" className={"navbar " + (burgerMenuActive ? "opened" : "")}>
                <ul>
                    <li>
                        <Link onClick={handleMobileMenuClick} to={"/"}>Accueil</Link>
                    </li>
                    <li>
                        <p id="nav-mobile-boutique" className="nav-boutique" onClick={handleBoutiqueClick}>Boutique</p>
                        <div id="mobile-boutique-container">
                            <ul>
                                {
                                    boutiques?.map((boutique) => {
                                        return (
                                            <li key={boutique[0]}>
                                                <Link onClick={handleMobileMenuClick} to={boutique[1]}>{boutique[0]}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link onClick={handleMobileMenuClick} to={"/a-propos"}>À propos</Link>
                    </li>
                </ul>
            </nav>
            <nav id="navbar-desktop" className="navbar navbar-bg-blur">
                <ul>
                    <li>
                        <Link onClick={handleMobileMenuClick} to={"/"}>Accueil</Link>
                    </li>
                    <li>
                        <p id="nav-desktop-boutique" className="nav-boutique" onClick={handleBoutiqueClick}>Boutique</p>
                    </li>
                    <li>
                        <Link onClick={handleMobileMenuClick} to={"/a-propos"}>À propos</Link>
                    </li>
                </ul>
                <div id="desktop-boutique-container">
                    <ul>
                        {
                            boutiques?.map((boutique) => {
                                return (
                                    <li key={boutique[0]}>
                                        <Link onClick={handleMobileMenuClick} to={boutique[1]}>{boutique[0]}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
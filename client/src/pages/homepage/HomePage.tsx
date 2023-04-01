import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import './HomePage.scss';
import { MdArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from 'react';
import v from "../../globalVariables"

interface getThreeAvailableProductsRes {
    id: number;
    first_picture: string;
    available: boolean;
    price: number;
    title: string;
}

export default function HomePage() {
    const [products, setproducts] = useState<Array<getThreeAvailableProductsRes>>([])
    useEffect(() => {
        for (let i = 0; i < document.getElementsByClassName("fake-nav-bar").length; i++) {
            document.getElementsByClassName("fake-nav-bar")[i].setAttribute("landing-hidden", "")
        }
        document.getElementById("burger-menu-big-container")?.setAttribute("landing-hidden", "")
        const eventListener = () => {
            if (window.scrollY === 0) {
                for (let i = 0; i < document.getElementsByClassName("navbar").length; i++) {
                    document.getElementsByClassName("navbar")[i].setAttribute("landing-hidden", "")
                }
                document.getElementById("burger-menu-big-container")?.setAttribute("landing-hidden", "")
            } else {
                for (let i = 0; i < document.getElementsByClassName("navbar").length; i++) {
                    document.getElementsByClassName("navbar")[i].removeAttribute("landing-hidden")
                }
                document.getElementById("burger-menu-big-container")?.removeAttribute("landing-hidden")
            }
        }
        window.addEventListener("scroll", eventListener)
        eventListener()
        window.scrollTo(0, 0)
        return () => {
            window.removeEventListener("scroll", eventListener)
            for (let i = 0; i < document.getElementsByClassName("navbar").length; i++) {
                document.getElementsByClassName("navbar")[i].removeAttribute("landing-hidden")
            }
            for (let i = 0; i < document.getElementsByClassName("fake-nav-bar").length; i++) {
                document.getElementsByClassName("fake-nav-bar")[i].removeAttribute("landing-hidden")
            }
            document.getElementById("burger-menu-big-container")?.removeAttribute("landing-hidden")
        }
    }, [])
    useEffect(() => {
        fetch(v.serverUrl + "getThreeAvailableProducts", { method: "POST", headers: { "Content-type": "application/json" } }).then((res) => {
            if (res.status === 200) {
                res.json().then((response) => {
                    setproducts(response)
                })
            }
        })
    }, [])

    const handleLandingArrowClick = () => {
        window.scroll({
            top: window.scrollY + 250,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div id="homepage">
            <div id="landing-div">
                <img src="/images/landing_image.png" alt="Bois" />
                <h1 id='homepage-landing-title'>La Fabriq</h1>
                <div className="landing-page-call-to-action">
                    <p className='other-font'>Découvrez nos créations</p>
                    <MdOutlineKeyboardArrowDown onClick={handleLandingArrowClick} className='landing-arrow-call-to-action' />
                </div>
            </div>
            <h2 id="homepage-creatrice-d-ambiance" className="other-font">"Créatrice d'ambiance"</h2>
            <div className="homepage-image-container-with-text">
                <div className="image-with-text-container">
                    <img src="/images/img_presentation_2.jpeg" alt="Table" className="homepage-image homepage-img-1" />
                    <img src="/images/img_presentation_8.jpeg" alt="Table" className="homepage-image homepage-img-2" />
                </div>
                <div className="homepage-legend-text-container">
                    <p className="homepage-text">Le bois est notre passion.</p>
                    <p className="homepage-text">Nous créons des pièces uniques :
                        tables en bois massif, tables basses et consoles pour que votre intérieur soit original.</p>
                    <p className="homepage-text">Toutes nos créations sont recyclées.</p>
                    <p className="homepage-text">Elles ont une âme, un vécu, du caractère.</p>
                    <p className="homepage-text">Retrouvez aussi des objets et du mobilier vintage, rare ou d'exception.</p>
                </div>
            </div>
            <h2 id="homepage--text" className="other-font">Découvrez notre boutique</h2>
            <div className="homepage-cards">
                {products.map((product) => {
                    return (
                        <Card key={product.id} id={product.id} price={product.price} picturePath={v.serverUrl + "images/creations/resized/" + product.first_picture} available={product.available} name={product.title} />
                    )
                })}
            </div>
            <Link to="/boutique/mobilier" className='homepage-view-more'><button className='shadow'><p>Voir plus</p><MdArrowRight /></button></Link>
        </div>
    );
}

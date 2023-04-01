import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Product.scss"
import Carousel from "../../components/carousel/Carousel";
import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import v from "../../globalVariables"

interface getProductRes {
    title: string;
    available: boolean;
    price: number;
    category: string;
    category_href: string;
    description: string;
    pictures: Array<string>;
}

export default function Product() {
    const params = useParams()
    const [pictures, setpictures] = useState<Array<string>>([])
    const [productTitle, setproductTitle] = useState<string>("")
    const [productPrice, setproductPrice] = useState<number>(NaN)
    const [productAvailable, setproductAvailabke] = useState<boolean>(true)
    const [productdescription, setproductdescription] = useState<string>("")
    const [productCategory, setproductCategory] = useState<string>("")
    const [productCategoryHref, setproductCategoryHref] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(v.serverUrl + "getProduct", { method: "POST", body: JSON.stringify({ "id": params.id }), headers: { 'Content-Type': 'application/json' } }).then((res) => {
            if (res.status === 200) {
                res.json().then((response: getProductRes) => {
                    var final_pictures = []
                    for (const picture of response.pictures) {
                        final_pictures.push(v.serverUrl + "images/creations/" + picture)
                    }
                    setpictures(final_pictures)
                    setproductTitle(response.title)
                    setproductPrice(response.price)
                    setproductAvailabke(response.available)
                    setproductdescription(response.description)
                    setproductCategory(response.category)
                    setproductCategoryHref(response.category_href)
                })
            } else {
                navigate("/404")
            }
        })
    }, [params, navigate])

    return (
        <div className="main-div" id="product">
            <div className="product-infos-container">
                <div className="product-carousel-container shadow">
                    <Carousel pictures={pictures} />
                </div>
                <div className="product-infos">
                    <h1 className="product-title">{productTitle}</h1>
                    <h2 className="product-price">{!Number.isNaN(productPrice) ? `${productPrice}€` : ""}</h2>
                    <p className="product-description" dangerouslySetInnerHTML={{ __html: productdescription }}></p>
                    <p className={"product-availability " + (productAvailable ? "available" : "not-available")}>{productAvailable ? "En stock dans notre showroom" : "Ce produit n'est plus disponible"}</p>
                    {productAvailable ? <p className="product-contact-info">Si cette pièce vous intéresse, vous pouvez nous contacter par téléphone au <a href="tel:0698590869">06 98 59 08 69</a> ou par mail à l'adresse <a href="mailto:contact@la-fabriq.com">contact@la-fabriq.com</a></p> : <Link to={"/boutique/" + productCategoryHref}><button className="view-more-product">Voir d'autres produits dans la catégorie {productCategory}<MdArrowRight /></button></Link>}
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card, { CardProps } from "../../components/card/Card";
import CardSkeleton from "../../components/card/CardSkeleton";
import "./Products.scss"
import v from "../../globalVariables"

interface getProductsRes {
    id: number;
    available: boolean;
    title: string;
    first_picture: string;
    price: number;
}

export default function Products() {
    const [products, setproducts] = useState<Array<CardProps>>([])
    const navigate = useNavigate()

    const params = useParams<{ category: string }>()
    const [displayName, setdisplayName] = useState<string | undefined>(params.category)

    useEffect(() => {
        setdisplayName(params.category)
        setproducts([])
        fetch(v.serverUrl + "getProducts", { method: "POST", credentials: "include", mode: "cors", body: JSON.stringify({ "category": params.category }), headers: { 'Content-Type': 'application/json' }, }).then((res) => {
            if (res.status === 200) {
                res.json().then((response: Array<getProductsRes>) => {
                    for (const product of response) {
                        setproducts(current => [...current, { "id": product.id, "available": product.available, "name": product.title, "picturePath": product.first_picture, "price": product.price }])
                    }
                })
            }
        })
        fetch(v.serverUrl + "getCategoryDisplayName", { method: "POST", credentials: "include", mode: "cors", body: JSON.stringify({ "name": params.category }), headers: { "Content-Type": "application/json" } }).then((res: Response) => {
            if (res.status === 200) {
                res.text().then((response: string) => {
                    setdisplayName(response)
                })
            } else {
                navigate("/404")
            }
        })
        window.scrollTo(0, 0)
    }, [params.category, navigate])
    return (
        <div className="main-div" id="products">
            <h1 className="products-title">{displayName}</h1>
            <div className="products-cards-container">
                {products.length > 0 ? products.map((product) => {
                    return (
                        <Card key={product.picturePath} price={product.price} available={product.available} picturePath={v.serverUrl + "images/creations/resized/" + product.picturePath} name={product.name} id={product.id} />
                    )
                }) : <><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}
            </div>
        </div>
    )
}
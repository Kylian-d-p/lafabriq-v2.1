import { Link } from "react-router-dom";
import { MdArrowRight, MdClose } from "react-icons/md";
import { useState } from "react";
import "./AdminCard.scss"
import v from "../../../../globalVariables"

interface CardProps {
    price: number;
    available: boolean; // en stock
    picturePath: string;
    name: string;
    id: number;
}

export default function AdminCard(props: CardProps) {
    const [deletingProduct, setdeletingProduct] = useState<boolean>(false)
    const [errorText, seterrorText] = useState<string>("")
    const handleDeleteClick = () => {
        for (let i = 0; i < document.getElementsByClassName(`admin-delete-confirm-${props.id}`).length; i++) {
            document.getElementsByClassName(`admin-delete-confirm-${props.id}`)[i].toggleAttribute("active")
        }
    }

    const handleDeleteConfirm = () => {
        seterrorText("")
        setdeletingProduct(true)
        fetch(v.serverUrl + "deleteProduct", { method: "POST", credentials: "include", headers: { "Content-type": "application/json" }, body: JSON.stringify({ "id": props.id }) }).then((res) => {
            setdeletingProduct(false)
            if (res.status === 200) {
                handleDeleteClick()
                document.location.reload()
            } else {
                seterrorText("Une erreur est survenue")
            }
        })
    }

    return (
        <>
            <div className="admin-card">
                <div className="card-picture-container">
                    <img src={props.picturePath} alt={props.name} className="card-picture" />
                </div>
                <div>
                    <p className="card-title">{props.name}</p>
                    <p className={"card-legend " + (props.available ? "available" : "not-available")}>{props.available ? "Cette pièce est disponible" : "Cette pièce n'est plus disponible"}</p>
                    <p className="card-price">{props.price}€</p>
                </div>
                <div>
                    <Link to={"/admin-lf/menu/modifier/" + props.id} className="view-product-container">
                        <button className="view-product active">Éditer le produit<MdArrowRight className="arrow-right" /></button>
                    </Link>
                    <button className="delete-product" onClick={handleDeleteClick}>
                        Supprimer
                    </button>
                </div>
            </div>
            <div className={`admin-delete-confirm admin-delete-confirm-${props.id} shadow`}>
                <MdClose className="close" onClick={handleDeleteClick} />
                <h2>Vous vous apprêtez à supprimer définitivement ce produit</h2>
                <h3>{props.name}</h3>
                <img src={props.picturePath} alt="Produit" />
                <button className="shadow" disabled={deletingProduct} onClick={handleDeleteConfirm}>Oui, je veux supprimer définitivement ce produit</button>
                {errorText ? <p className="error-text">{errorText}</p> : ""}
            </div>
        </>
    )
}
export type { CardProps };

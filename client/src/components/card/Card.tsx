import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import "./Card.scss"

interface CardProps {
    price: number;
    available: boolean; // en stock
    picturePath: string;
    name: string;
    id: number;
}

export default function Card(props: CardProps) {
    return (
        <div className="card">
            <div className="card-picture-container">
                <img src={props.picturePath} alt={props.name} className="card-picture" />
            </div>
            <div>
                <p className="card-title">{props.name}</p>
                <p className={"card-legend " + (props.available ? "available" : "not-available")}>{props.available ? "Cette pièce est disponible" : "Cette pièce n'est plus disponible"}</p>
                <p className="card-price">{props.price}€</p>
            </div>
            <Link to={"/produit/" + props.id} className="view-product-container">
                <button className="view-product active">Voir le produit<MdArrowRight className="arrow-right" /></button>
            </Link>
        </div>
    )
}
export type { CardProps };

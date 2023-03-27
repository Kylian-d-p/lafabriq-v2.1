import { useRef } from "react";
import "./BurgerMenu.scss"

interface BurgerMenuProps {
    active: boolean;
    setactive: (active: boolean) => void;
}

export default function BurgerMenu(props: BurgerMenuProps) {

    const burgerMenuRef = useRef<HTMLDivElement>(null)

    const HandleBurgerMenuClick = () => {
        props.setactive(!props.active)
    }

    return (
        <div className={"burger-menu " + (props.active ? "active" : "")} onClick={HandleBurgerMenuClick} ref={burgerMenuRef}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
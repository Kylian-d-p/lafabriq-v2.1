import { Link, useLocation, Outlet } from "react-router-dom"
import "./AdminNav.scss"

export default function AdminNav() {
    var location = useLocation()

    return (
        <div className="main-admin-div">
            <nav id="admin-nav">
                <ul>
                    <li>
                        <Link to="/admin-lf/menu/nouvel-article">
                            <h2 className={location.pathname === "/admin-lf/menu/nouvel-article" ? "active" : ""}>Nouvel article</h2>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-lf/menu/modifier">
                            <h2 className={location.pathname === "/admin-lf/menu/modifier" ? "active" : ""}>Modifier un article</h2>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
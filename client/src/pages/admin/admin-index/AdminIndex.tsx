import "./AdminIndex.scss"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import v from "../../../globalVariables"

export default function AdminIndex() {
    const [username, setusername] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const [logging, setlogging] = useState<boolean>(false)
    const [errorText, seterrorText] = useState<string>("")

    const navigate = useNavigate()

    useEffect(() => {
        document.querySelector("meta[name='robots']")?.setAttribute("content", "noindex,nofollow")
    }, [])

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setusername(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setlogging(true)
        fetch(v.serverUrl + "admin-login", {
            method: "POST", credentials: "include", mode: "cors", headers: { "Content-type": "application/json" }, body: JSON.stringify({
                username,
                password
            })
        }).then((res) => {
            setlogging(false)
            if (res.status === 200) {
                res.json().then((res) => {
                    localStorage.setItem("jwt", res)
                    navigate("/admin-lf/menu/nouvel-article")
                })
            } else {
                res.text().then((response) => {
                    seterrorText(response)
                })
            }
        })
    }

    return (
        <div id="admin-index" className="main-admin-div">
            <h1>Espace d'administration La Fabriq</h1>
            <div className="auth-div">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit} className="fields">
                    <input autoComplete="username" type="text" required placeholder="Nom d'utilisateur" value={username} onChange={handleUsernameChange} />
                    <input autoComplete="current-password" type="password" required placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />
                    <button disabled={logging}>{logging ? "Connexion en cours..." : "Entrer"}</button>
                </form>
                <p className="error-text">{errorText}</p>
            </div>
            <p className="text-info">Si vous avez oublié votre mot de passe, veuillez contacter le webmaster.</p>
        </div>
    )
}
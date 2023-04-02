import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import v from "../../globalVariables"

export default function CheckAdminConnected() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch(v.serverUrl + "isAdminConnected", { method: "POST", credentials: "include", mode: "cors", "headers": { "Content-type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") } }).then((res) => {
            if (res.status !== 200) {
                navigate("/404")
            }
        })
    }, [navigate])
    return (
        <></>
    )
}
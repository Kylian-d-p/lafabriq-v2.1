import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import v from "../../globalVariables"

export default function CheckAdminConnected() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch(v.serverUrl + "isAdminConnected", { method: "POST", credentials: "include", "headers": { "Content-type": "application/json" } }).then((res) => {
            if (res.status !== 200) {
                navigate("/404")
            }
        })
    }, [navigate])
    return (
        <></>
    )
}
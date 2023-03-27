import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function CheckAdminConnected() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch("/isAdminConnected", { method: "POST", "headers": { "Content-type": "application/json" } }).then((res) => {
            if (res.status !== 200) {
                navigate("/404")
            }
        })
    }, [navigate])
    return (
        <></>
    )
}
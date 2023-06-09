import CheckAdminConnected from "../CheckAdminConnected"
import "./Edit.scss"
import { useEffect, useState } from "react"
import Select from "react-select"
import AdminCard from "../components/admin-card/AdminCard"
import v from "../../../globalVariables"

var currentCategory: string = ""
var currentScroll: number = 0

export default function Edit() {
    const [products, setproducts] = useState<Array<{ id: number, title: string, available: boolean, price: number, first_picture: string }>>([])
    const [categories, setcategories] = useState<Array<{ value: string, label: string }>>()
    const [categoriesLoaded, setcategoriesLoaded] = useState<boolean>(false)
    const [productsLoading, setproductsLoading] = useState<boolean>(false)

    useEffect(() => {
        fetch(v.serverUrl + "getCategories", { method: "POST", credentials: "include", mode: "cors", headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") } }).then((res) => {
            if (res.status === 200) {
                res.json().then((response) => {
                    var catTemp: Array<{ value: string, label: string }> = []
                    for (const category of response) {
                        catTemp.push({ value: category.name, label: category.display_name })
                    }
                    setcategories(catTemp)
                    setcategoriesLoaded(true)
                    if (currentCategory !== "") {
                        fetch(v.serverUrl + "getProducts", { method: "POST", credentials: "include", mode: "cors", headers: { "Content-type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") }, body: JSON.stringify({ "category": currentCategory }) }).then((res) => {
                            if (res.status === 200) {
                                res.json().then((response) => {
                                    setproductsLoading(false)
                                    setproducts(response)
                                    setTimeout(() => {
                                        window.scrollTo(0, currentScroll)
                                    }, 50)
                                })
                            }
                        })
                    }
                })
            }
        })

        const scrollListener = () => {
            currentScroll = window.scrollY
        }
        document.addEventListener("scroll", scrollListener)
        return () => {
            document.removeEventListener("scroll", scrollListener)
        }
    }, [])

    const handleCategoryChange = (e: any) => {
        setproductsLoading(true)
        currentCategory = e.value
        fetch(v.serverUrl + "getProducts", { method: "POST", credentials: "include", mode: "cors", headers: { "Content-type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") }, body: JSON.stringify({ "category": e.value }) }).then((res) => {
            if (res.status === 200) {
                res.json().then((response) => {
                    setproductsLoading(false)
                    setproducts(response)
                })
            }
        })
    }

    return (
        <div id="admin-edit">
            <CheckAdminConnected />
            <div className="category-filter">
                <h2>Catégorie</h2>
                <Select name="Catégorie" isClearable={false} onChange={handleCategoryChange} options={categories} isSearchable={true} isLoading={!categoriesLoaded} />
            </div>
            <div className="products-container">
                {
                    !productsLoading ?
                        (products.length === 0 ? <h2 className="no-cat-selected">Sélectionnez une catégorie pour éditer les produits</h2> :
                            products.map((product) => {
                                return (
                                    <AdminCard key={product.id} picturePath={v.serverUrl + "images/creations/resized/" + product.first_picture} price={product.price} available={product.available} name={product.title} id={product.id} />
                                )
                            })) :
                        <h2 className="no-cat-selected">Chargement en cours...</h2>
                }
            </div>
        </div>
    )
}
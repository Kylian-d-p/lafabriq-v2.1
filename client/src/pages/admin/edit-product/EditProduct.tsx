import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, ChangeEvent } from "react"
import "./EditProduct.scss"
import CreationUpload from "../components/creation-upload/CreationUpload"
import Checkbox from "../../../components/checkbox/Checkbox"
import Select from "react-select/creatable"
import v from "../../../globalVariables"

export default function EditProduct() {
    const params = useParams()
    const [description, setdescription] = useState<string>("")
    const [price, setprice] = useState<number>(0)
    const [title, settitle] = useState<string>("")
    const [category, setcategory] = useState<{ label: string, value: string, __isNew__: boolean }>()
    const [sold, setsold] = useState<boolean>(false)
    const [pictures, setpictures] = useState<Array<string>>([])
    const [categories, setcategories] = useState<Array<{ value: string, label: string }>>([])
    const [categoriesLoaded, setcategoriesLoaded] = useState<boolean>(false)
    const [productLoaded, setproductLoaded] = useState<boolean>(false)
    const [updatingProduct, setupdatingProduct] = useState<boolean>(false)
    const [errorText, seterrorText] = useState<string>("")
    const [newCategoryConfirmed, setnewCategoryConfirmed] = useState<boolean>(false)
    const [noDescriptionConfirmed, setnoDescriptionConfirmed] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        setcategoriesLoaded(false)
        fetch(v.serverUrl + "getAdminCategories", { method: "POST" }).then(async (res) => {
            res.json().then((response) => {
                var boutiquesTemp = []
                for (const category of response) {
                    boutiquesTemp.push({ value: category.name, label: category.display_name })
                }
                setcategories(boutiquesTemp)
                setcategoriesLoaded(true)
            })
        })
        fetch(v.serverUrl + "getProduct", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ "id": params.id }) }).then((res) => {
            if (res.status === 200) {
                res.json().then((response) => {
                    settitle(response.title)
                    setsold(!response.available)
                    setprice(response.price)
                    setcategory({ "label": String(response.category), "value": String(response.category_href), "__isNew__": false })
                    setdescription(response.description.replace(/<br\s*\/?>/gi, "\n"))
                    setpictures(response.pictures)
                    setproductLoaded(true)
                })
            }
        })
    }, [params.id])

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        settitle(e.target.value)
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(Number(e.target.value))) {
            setprice(Number(e.target.value))
        }
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setdescription(e.target.value)
        setnoDescriptionConfirmed(false)
    }

    const handleCategoryChange = (e: any) => {
        setcategory(e)
        setnewCategoryConfirmed(false)
    }

    const handleProductUpdate = () => {
        setupdatingProduct(true)
        seterrorText("")
        if (category) {
            if (!category.__isNew__ || newCategoryConfirmed) {
                if (title) {
                    if (price > 0) {
                        if (pictures.length >= 1) {
                            if (description || noDescriptionConfirmed) {
                                fetch(v.serverUrl + "updateProducts", {
                                    method: "POST",
                                    headers: { "Content-type": "application/json" },
                                    body: JSON.stringify({
                                        id: Number(params.id),
                                        title,
                                        "available": !Boolean(sold),
                                        price,
                                        "category": category.value,
                                        description,
                                        pictures
                                    })
                                }).then((res) => {
                                    setupdatingProduct(false)
                                    if (res.status !== 200) {
                                        res.text().then((response) => {
                                            seterrorText(response)
                                        })
                                    } else {
                                        navigate("/admin-lf/menu/modifier")
                                    }
                                })
                            } else {
                                setnoDescriptionConfirmed(true)
                                setupdatingProduct(false)
                                seterrorText("Il est recommandé d'écrire une description, cliquez à nouveau sur \"Mettre à jour\" pour confirmer la mise en ligne sans description")
                            }
                        } else {
                            setupdatingProduct(false)
                            seterrorText("Vous devez sélectionner des images")
                        }
                    } else {
                        setupdatingProduct(false)
                        seterrorText("Vous devez entrer un prix")
                    }
                } else {
                    setupdatingProduct(false)
                    seterrorText("Vous devez entrer un titre")
                }
            } else {
                setupdatingProduct(false)
                setnewCategoryConfirmed(true)
                seterrorText("Vous vous apprêtez à créer une nouvelle catégorie, cliquez à nouveau sur \"Mettre à jour\" pour confirmer la création d'une nouvelle catégorie")
            }
        } else {
            setupdatingProduct(false)
            seterrorText("Vous devez sélectionner une catégorie pour cet aricle")
        }
    }

    return (
        <div id="admin-product">
            <h1>Éditer ce produit</h1>
            <input type="text" placeholder="Titre" value={title} onChange={handleTitleChange} />
            <input type="text" placeholder="Prix" value={price === 0 ? "" : price} onChange={handlePriceChange} />
            <textarea placeholder="Description" rows={7} value={description} onChange={handleDescriptionChange} />
            <div className="checkbox-container">
                <Checkbox id="sold" checked={sold} setchecked={setsold} />
                <label htmlFor="sold">{sold ? "Le produit est vendu" : "Le produit n'est pas vendu"}</label>
            </div>
            <div className="category-container">
                {productLoaded ?
                    <>
                        <p>Choisissez une catégorie : </p>
                        <Select name="Catégorie" isClearable={false} onChange={handleCategoryChange} options={categories} isSearchable={true} isLoading={!categoriesLoaded} className="category-select" defaultValue={{ "label": category?.label, "value": category?.value }} />
                    </>
                    : ""
                }
            </div>
            <div className="creation-upload-container">
                <CreationUpload pictures={pictures} setpictures={setpictures} />
            </div>
            <button className="update-product shadow" onClick={handleProductUpdate} disabled={updatingProduct}>Mettre à jour</button>
            {errorText ? <p className="error-text">{errorText}</p> : ""}
        </div>
    )
}
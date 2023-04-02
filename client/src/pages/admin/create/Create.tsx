import "./Create.scss"
import { ChangeEvent, useState, useEffect } from "react"
import Checkbox from "../../../components/checkbox/Checkbox"
import CreationUpload from "../components/creation-upload/CreationUpload"
import CheckAdminConnected from "../CheckAdminConnected"
import Select from "react-select/creatable"
import v from "../../../globalVariables"

interface categoriesOptions {
    label: string,
    value: string
}

export default function Create() {
    const [title, settitle] = useState<string>("")
    const [price, setprice] = useState<number>(0)
    const [description, setdescription] = useState<string>("")
    const [sold, setsold] = useState<boolean>(false)
    const [pictures, setpictures] = useState<Array<string>>([])
    const [selectedCategory, setselectedCategory] = useState<{ label: string, value: string, __isNew__: boolean | null }>()
    const [categories, setcategories] = useState<Array<categoriesOptions>>([])
    const [categoriesLoaded, setcategoriesLoaded] = useState<boolean>(false)
    const [creatingArticle, setcreatingArticle] = useState<boolean>(false)
    const [errorText, seterrorText] = useState<string>("")
    const [noDescriptionConfirmed, setnoDescriptionConfirmed] = useState<boolean>(false)
    const [newCategoryConfirmed, setnewCategoryConfirmed] = useState<boolean>(false)

    useEffect(() => {
        fetch(v.serverUrl + "getAdminCategories", { method: "POST", credentials: "include", mode: "cors", headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") } }).then(async (res) => {
            res.json().then((response) => {
                var boutiquesTemp = []
                for (const category of response) {
                    boutiquesTemp.push({ value: category.name, label: category.display_name })
                }
                setcategories(boutiquesTemp)
                setcategoriesLoaded(true)
            })
        })
    }, [])

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
        setselectedCategory(e)
        setnewCategoryConfirmed(false)
    }

    const handleCreateArticleClick = () => {
        setcreatingArticle(true)
        seterrorText("")
        if (selectedCategory) {
            if (!selectedCategory.__isNew__ || newCategoryConfirmed) {
                if (title) {
                    if (price > 0) {
                        if (pictures.length >= 1) {
                            if (description || noDescriptionConfirmed) {
                                fetch(v.serverUrl + "createProducts", {
                                    method: "POST", credentials: "include", mode: "cors",
                                    headers: { "Content-type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
                                    body: JSON.stringify({
                                        title,
                                        "available": !sold,
                                        price,
                                        "category": selectedCategory.value,
                                        description,
                                        pictures
                                    })
                                }).then((res) => {
                                    setcreatingArticle(false)
                                    if (res.status !== 200) {
                                        res.text().then((response) => {
                                            seterrorText(response)
                                        })
                                    } else {
                                        settitle("")
                                        setprice(0)
                                        setdescription("")
                                        setpictures([])
                                    }
                                })
                            } else {
                                setnoDescriptionConfirmed(true)
                                setcreatingArticle(false)
                                seterrorText("Il est recommandé d'écrire une description, cliquez à nouveau sur \"Mettre en ligne\" pour confirmer la mise en ligne sans description")
                            }
                        } else {
                            setcreatingArticle(false)
                            seterrorText("Vous devez sélectionner des images")
                        }
                    } else {
                        setcreatingArticle(false)
                        seterrorText("Vous devez entrer un prix")
                    }
                } else {
                    setcreatingArticle(false)
                    seterrorText("Vous devez entrer un titre")
                }
            } else {
                setcreatingArticle(false)
                setnewCategoryConfirmed(true)
                seterrorText("Vous vous apprêtez à créer une nouvelle catégorie, cliquez à nouveau sur \"Mettre en ligne\" pour confirmer la création d'une nouvelle catégorie")
            }
        } else {
            setcreatingArticle(false)
            seterrorText("Vous devez sélectionner une catégorie pour cet aricle")
        }
    }
    return (
        <div id="admin-create">
            <CheckAdminConnected />
            <div className="fields">
                <input type="text" placeholder="Titre" value={title} onChange={handleTitleChange} />
                <input type="text" placeholder="Prix" value={price === 0 ? "" : price} onChange={handlePriceChange} />
                <textarea placeholder="Description" value={description} onChange={handleDescriptionChange} />
                <div className="checkbox-container">
                    <Checkbox id="sold" checked={sold} setchecked={setsold} />
                    <label htmlFor="sold">{sold ? "Le produit est vendu" : "Le produit n'est pas vendu"}</label>
                </div>
                <div className="category-container">
                    <p>Choisissez une catégorie : </p>
                    <Select name="Catégorie" isClearable={false} onChange={handleCategoryChange} options={categories} isSearchable={true} isLoading={!categoriesLoaded} className="category-select" />
                </div>
                <div className="create-upload-container">
                    <CreationUpload pictures={pictures} setpictures={setpictures} />
                </div>
                <button className="create-article shadow" disabled={creatingArticle} onClick={handleCreateArticleClick}>Mettre en ligne</button>
                {errorText !== "" ?
                    <p className="errorText">{errorText}</p> : ""}
            </div>
        </div>
    )
}
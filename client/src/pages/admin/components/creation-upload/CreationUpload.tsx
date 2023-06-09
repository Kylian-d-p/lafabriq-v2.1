import "./CreationUpload.scss"
import { useRef, ChangeEvent, useState } from "react"
import { MdClose, MdCheck, MdDeleteForever } from "react-icons/md"
import v from "../../../../globalVariables"

interface CreationUploadProps {
    pictures: Array<string>;
    setpictures: (pictures: Array<string>) => void;
}

export default function CreationUpload(props: CreationUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setuploading] = useState<Boolean>(false)
    const [imageContainerText, setimageContainerText] = useState<string>("Aucune image choisie")
    const [uploadedFiles, setuploadedFiles] = useState<Array<string>>([])
    const [uploadedFilesError, setuploadedFilesError] = useState<boolean>(false)
    const [uploadErrorText, setuploadErrorText] = useState<string>("")

    const handleUploadFilesClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setimageContainerText("Import en cours...")
        setuploadErrorText("")
        if (!e.target.files) {
            return;
        }
        const files = e.target.files ? Array.from(e.target.files) : []

        const data = new FormData()
        files.forEach((file, i) => {
            if (["image/png", "image/jpeg", "image/jpg"].indexOf(file.type) >= 0) {
                data.append(`file`, file)
            }

        })
        setuploading(true)

        fetch(v.serverUrl + 'uploadCreation', {
            method: 'POST', credentials: "include", mode: "cors",
            headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") },
            body: data,
        }).then((res) => {
            setuploading(false)
            if (res.status === 200) {
                setimageContainerText("Aucune image choisie")
                setuploadErrorText("")
                res.json().then((response) => {
                    const newPictures = props.pictures.slice()
                    for (const picture of response) {
                        newPictures.push(picture)
                    }
                    props.setpictures(newPictures)

                })
            } else {
                res.json().then((response) => {
                    setimageContainerText(response.message)
                    setuploadErrorText(response.message)
                    if (response.errors) {
                        var imageContainerTextTemp = ""
                        for (let i = 0; i < response.errors.length; i++) {
                            const filename = response.errors[i];
                            imageContainerTextTemp += filename + ","
                        }
                        if (response.errors.length == 1) {
                            imageContainerTextTemp = "Le fichier " + imageContainerTextTemp.slice(0, imageContainerTextTemp.length - 1) + " n'a pas pu être importé."
                        } else {
                            imageContainerTextTemp = "Les fichiers " + imageContainerTextTemp.slice(0, imageContainerTextTemp.length - 1) + " n'ont pas pu être importés."
                        }
                        setuploadErrorText(imageContainerTextTemp)
                        setimageContainerText(imageContainerTextTemp)
                        const newPictures = props.pictures.slice()
                        for (const picture of response.success) {
                            newPictures.push(picture)
                        }
                        props.setpictures(newPictures)
                    }
                })
            }
        })
    }

    const handleFileSelectionClick = () => {
        document.getElementById("files-already-uploaded-container")?.classList.add("opened")
        fetch(v.serverUrl + "getAllPictures", { method: "POST", credentials: "include", mode: "cors", headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") } }).then((res) => {
            if (res.status === 200) {
                setuploadedFilesError(false)
                res.json().then((response) => {
                    setuploadedFiles(response)
                })
            } else {
                setuploadedFilesError(true)
            }
        })
    }

    const handleFileContainerClose = () => {
        document.getElementById("files-already-uploaded-container")?.classList.remove("opened")
    }

    const handleUploadedPictureClick = (file: string) => {
        if (props.pictures.indexOf(file) >= 0) {
            const newPictures = props.pictures.slice()
            newPictures.splice(props.pictures.indexOf(file), 1)
            props.setpictures(newPictures)
        } else {
            const newPictures = props.pictures.slice()
            newPictures.push(file)
            props.setpictures(newPictures)
        }
    }

    const handleDeleteClick = (file: string) => {
        if (!uploading) {
            if (props.pictures.indexOf(file) >= 0) {
                const newPictures = props.pictures.slice()
                newPictures.splice(props.pictures.indexOf(file), 1)
                props.setpictures(newPictures)
            }
        }
    }

    return (
        <>
            <fieldset className="creation-upload">
                <legend>Images</legend>
                <div className={`images-container ${uploading ? "uploading" : ""}`}>
                    {props.pictures.length === 0 ? <p className="no-pictures-uploaded">{imageContainerText}</p> :
                        props.pictures.map((picture) => {
                            return (
                                <div className="preview-pictures-container" key={picture}>
                                    <MdDeleteForever className="delete" onClick={() => { handleDeleteClick(picture) }} />
                                    <img key={picture} src={v.serverUrl + "images/creations/resized/" + picture} alt="Previsualisation" />
                                </div>
                            )
                        })
                    }
                </div>
                {uploadErrorText ? <p className="uploadErrorText">{uploadErrorText}</p> : ""}
                <button onClick={handleUploadFilesClick} className="upload-btn shadow" disabled={Boolean(uploading)}>Importer des images depuis l'ordinateur</button>
                <button onClick={handleFileSelectionClick} className="selection-btn shadow" disabled={Boolean(uploading)}>Utiliser une image déjà existante</button>
                <input type="file" ref={fileInputRef} accept="image/png, image/jpeg" className="input-file" onChange={handleFileChange} multiple />
            </fieldset>
            <div id="files-already-uploaded-container" className="shadow">
                <MdClose className="close" onClick={handleFileContainerClose} />
                <div>
                    <p className="file-uploaded-title">Sélection des images :</p>
                    <div className="files-container">
                        {uploadedFilesError ? <p>Une erreur est survenue</p> :
                            uploadedFiles.length === 0 ? <p>Chargement en cours</p> :
                                uploadedFiles.map((file) => {
                                    return (
                                        <div className="image-uploaded-container" key={file} onClick={() => { handleUploadedPictureClick(file) }}>
                                            <img src={v.serverUrl + "images/creations/resized/" + file} alt="Illustration" className={"image-uploaded " + (props.pictures.indexOf(file) >= 0 ? "selected" : "")} />
                                            <MdCheck className="checked" />
                                        </div>
                                    )
                                })}
                    </div>
                </div>
            </div>
        </>
    )
}

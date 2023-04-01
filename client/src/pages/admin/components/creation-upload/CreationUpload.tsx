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

    const handleUploadFilesClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            method: 'POST',
            body: data,
        }).then((res) => {
            setuploading(false)
            if (res.status === 200) {
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
                    if (response.infos) {
                        var imageContainerTextTemp = "Les fichiers suivants n'on pas pu être importés : "
                        for (let i = 0; i < response.infos.length; i++) {
                            const filename = response.infos[i];
                            imageContainerTextTemp += filename + ","
                        }
                        setimageContainerText(imageContainerTextTemp)
                    }
                })
            }
        })
    }

    const handleFileSelectionClick = () => {
        document.getElementById("files-already-uploaded-container")?.classList.add("opened")
        fetch(v.serverUrl + "getAllPictures", { method: "POST" }).then((res) => {
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
        if (props.pictures.indexOf(file) >= 0) {
            const newPictures = props.pictures.slice()
            newPictures.splice(props.pictures.indexOf(file), 1)
            props.setpictures(newPictures)
        }
    }

    return (
        <>
            <fieldset className="creation-upload">
                <legend>Images</legend>
                <div className="images-container">
                    {props.pictures.length === 0 ? (uploading ? <p className="no-pictures-uploaded">Import des images en cours...</p> : <p className="no-pictures-uploaded">{imageContainerText}</p>) :
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
                <button onClick={handleUploadFilesClick} className="upload-btn shadow">Importer des images depuis l'ordinateur</button>
                <button onClick={handleFileSelectionClick} className="selection-btn shadow">Utiliser une image déjà existante</button>
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

import { Request, Response } from "express";
import crypto from "crypto"
import fs from "fs"
import path from "path";
import sharp from "sharp";
import { log } from "../globalFunc";


export default async function uploadCreations(req: Request, res: Response) {
    if (!Number.isNaN(req.headers["content-length"])) {
        if (req.files && typeof req.files.length == "number" && req.files.length >= 1) {
            if (Number(req.headers["content-length"]) <= 4000000 * req.files.length) {
                var readyToUpload = true
                var filesPath: Array<string> = []
                const files = req.files as Express.Multer.File[];
                files.forEach(async (file: Express.Multer.File) => {
                    const { buffer } = file
                    var picturePath: string
                    var checkIfPathExist: boolean = false
                    var count: number = 0
                    do {
                        count++
                        var picturePath = crypto.randomUUID() + crypto.randomUUID() + crypto.randomUUID() + crypto.randomUUID()
                        checkIfPathExist = fs.existsSync(path.join(__dirname, "../../creations/" + picturePath))
                    } while (checkIfPathExist && count <= 10)
                    if (count >= 12) {
                        readyToUpload = false
                    } else {
                        filesPath.push(picturePath)
                    }
                })
                if (readyToUpload) {
                    var filesSuccess: Array<Array<boolean>> = [] // [resizedSuccess, realSizeSuccess]
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        if (filesPath[i] !== undefined && typeof filesPath[i] === "string") {
                            const { buffer } = file
                            var image = sharp(buffer)
                            const metadata = await image.metadata();
                            let rotate = 0;
                            if (metadata.orientation === 6) {
                                rotate = 90;
                            } else if (metadata.orientation === 8) {
                                rotate = 270;
                            } else if (metadata.orientation === 3) {
                                rotate = 180;
                            }
                            await new Promise<void>((resolve) => {
                                image = image.rotate(rotate);
                                image.webp({ quality: 60 }).toFile(path.join(__dirname, "../../creations/resized/" + filesPath[i] + ".webp"), (err, info) => {
                                    if (err) {
                                        log(err, true)
                                        filesSuccess.push([false, false])
                                        resolve()
                                    } else {
                                        filesSuccess.push([true])
                                        image.webp().toFile(path.join(__dirname, "../../creations/" + filesPath[i] + ".webp"), (err, info) => {
                                            resolve()
                                            if (err) {
                                                log(err, true);

                                                filesSuccess[i].push(false)
                                            } else {
                                                filesSuccess[i].push(true)
                                            }
                                        })
                                    }
                                });
                            })
                        } else {
                            filesSuccess.push([false, false])
                        }
                    }

                    var filesError: Array<string> = []
                    for (let i = 0; i < filesSuccess.length; i++) {
                        const fileSuccess = filesSuccess[i];
                        if (!fileSuccess[0] || !fileSuccess[1]) {
                            filesError.push(files[i].filename)
                        }
                        if (!fileSuccess[0] && fileSuccess[1]) {
                            fs.unlink(path.join(__dirname, "../../creations/" + filesPath[i] + ".webp"), () => { })
                        } else if (fileSuccess[0] && !fileSuccess[1]) {
                            fs.unlink(path.join(__dirname, "../../creations/resized/" + filesPath[i] + ".webp"), () => { })
                        }
                    }
                    if (filesError.length == 0) {
                        for (let i = 0; i < filesPath.length; i++) {
                            filesPath[i] = filesPath[i] + ".webp"

                        }
                        res.status(200).json(filesPath)
                    } else {
                        res.status(500).json({ "message": "Une erreur interne est survenue", "infos": filesError })
                    }
                } else {
                    res.status(500).json({ "message": "Une erreur interne est survenue, réessayez plus tard" })
                }
            } else {
                res.status(400).json({ "message": "Le fichier ne peut pas dépasser les 4mb" })
            }
        }
    } else {
        res.status(500).json({ "message": "Une erreur est survenue" })
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const globalFunc_1 = require("../globalFunc");
function uploadCreations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Number.isNaN(req.headers["content-length"])) {
            if (req.files && typeof req.files.length == "number" && req.files.length >= 1) {
                if (Number(req.headers["content-length"]) <= 4000000 * req.files.length) {
                    var readyToUpload = true;
                    var filesPath = [];
                    const files = req.files;
                    files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                        const { buffer } = file;
                        var picturePath;
                        var checkIfPathExist = false;
                        var count = 0;
                        do {
                            count++;
                            var picturePath = crypto_1.default.randomUUID() + crypto_1.default.randomUUID() + crypto_1.default.randomUUID() + crypto_1.default.randomUUID();
                            checkIfPathExist = fs_1.default.existsSync(path_1.default.join(__dirname, "../../creations/" + picturePath));
                        } while (checkIfPathExist && count <= 10);
                        if (count >= 12) {
                            readyToUpload = false;
                        }
                        else {
                            filesPath.push(picturePath);
                        }
                    }));
                    if (readyToUpload) {
                        var filesSuccess = []; // [resizedSuccess, realSizeSuccess]
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            if (filesPath[i] !== undefined && typeof filesPath[i] === "string") {
                                const { buffer } = file;
                                var image = (0, sharp_1.default)(buffer);
                                const metadata = yield image.metadata();
                                let rotate = 0;
                                if (metadata.orientation === 6) {
                                    rotate = 90;
                                }
                                else if (metadata.orientation === 8) {
                                    rotate = 270;
                                }
                                else if (metadata.orientation === 3) {
                                    rotate = 180;
                                }
                                yield new Promise((resolve) => {
                                    image = image.rotate(rotate);
                                    image.webp({ quality: 60 }).toFile(path_1.default.join(__dirname, "../../creations/resized/" + filesPath[i] + ".webp"), (err, info) => {
                                        if (err) {
                                            (0, globalFunc_1.log)("Erreur lors de l'upload de l'image en taille réduite : " + err, true);
                                            filesSuccess.push([false, false]);
                                            resolve();
                                        }
                                        else {
                                            filesSuccess.push([true]);
                                            image.webp().toFile(path_1.default.join(__dirname, "../../creations/" + filesPath[i] + ".webp"), (err, info) => {
                                                resolve();
                                                if (err) {
                                                    (0, globalFunc_1.log)("Erreur lors de l'upload de l'image en taille réelle : " + err, true);
                                                    filesSuccess[i].push(false);
                                                }
                                                else {
                                                    filesSuccess[i].push(true);
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                            else {
                                filesSuccess.push([false, false]);
                            }
                        }
                        var filesError = [];
                        for (let i = 0; i < filesSuccess.length; i++) {
                            const fileSuccess = filesSuccess[i];
                            if (!fileSuccess[0] || !fileSuccess[1]) {
                                filesError.push(files[i].filename);
                                fs_1.default.unlink(path_1.default.join(__dirname, "../../creations/" + filesPath[i] + ".webp"), () => { });
                                fs_1.default.unlink(path_1.default.join(__dirname, "../../creations/resized/" + filesPath[i] + ".webp"), () => { });
                            }
                        }
                        if (filesError.length == 0) {
                            for (let i = 0; i < filesPath.length; i++) {
                                filesPath[i] = filesPath[i] + ".webp";
                            }
                            res.status(200).json(filesPath);
                        }
                        else {
                            res.status(500).json({ "message": "Une erreur interne est survenue", "infos": filesError });
                        }
                    }
                    else {
                        res.status(500).json({ "message": "Une erreur interne est survenue, réessayez plus tard" });
                    }
                }
                else {
                    res.status(400).json({ "message": "Le fichier ne peut pas dépasser les 4mb" });
                }
            }
        }
        else {
            res.status(500).json({ "message": "Une erreur est survenue" });
        }
    });
}
exports.default = uploadCreations;

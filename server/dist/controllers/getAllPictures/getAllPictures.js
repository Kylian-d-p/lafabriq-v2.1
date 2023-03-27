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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const globalFunc_1 = require("../../globalFunc");
function getAllPictures(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = path_1.default.join(__dirname, '../../../creations/');
        try {
            const elements = yield new Promise((resolve, reject) => {
                fs_1.default.readdir(folderPath, (err, elements) => {
                    if (err) {
                        (0, globalFunc_1.log)(err, true);
                        reject(err);
                    }
                    else {
                        resolve(elements);
                    }
                });
            });
            const files = [];
            for (const element of elements) {
                const filePath = path_1.default.join(folderPath, element);
                try {
                    const stats = yield fs_1.default.promises.stat(filePath);
                    if (stats.isFile()) {
                        files.push(element);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            res.status(200).json(files);
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Une erreur est survenue');
        }
    });
}
exports.default = getAllPictures;

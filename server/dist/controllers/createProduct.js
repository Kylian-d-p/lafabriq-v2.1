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
const server_1 = __importDefault(require("../server"));
const mysql_1 = __importDefault(require("mysql"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const globalFunc_1 = require("../globalFunc");
function insertProduct(title, available, price, category, description, pictures) {
    server_1.default.db.query(`INSERT INTO products(title, available, price, category, description) VALUES (${mysql_1.default.escape(title)}, ${mysql_1.default.escape(available)}, ${mysql_1.default.escape(price)}, ${mysql_1.default.escape(category)}, ${mysql_1.default.escape(description.replace(/\n/g, "<br/>"))})`, (err, result) => __awaiter(this, void 0, void 0, function* () {
        for (var picture of pictures) {
            var fileExists = yield checkFileExists(path_1.default.join(__dirname, '../../creations/'));
            if (fileExists) {
                server_1.default.db.query(`INSERT INTO products_pictures(product_id, picture_path) VALUES(${mysql_1.default.escape(result.insertId)}, ${mysql_1.default.escape(picture)})`);
            }
        }
    }));
}
function checkFileExists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(path, fs_1.constants.F_OK);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
function createProducts(req, res) {
    if (typeof req.body.title === "string" && typeof req.body.category === "string" && typeof req.body.price === "number" && typeof req.body.description === "string" && typeof req.body.pictures === "object" && typeof req.body.available === "boolean") {
        server_1.default.db.query(`SELECT id from categories WHERE name = ${mysql_1.default.escape(req.body.category)}`, (err, results) => __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                if (results.length == 1) {
                    insertProduct(req.body.title, req.body.available, req.body.price, results[0].id, req.body.description, req.body.pictures);
                    res.status(200).send();
                }
                else if (results.length == 0) {
                    server_1.default.db.query(`INSERT INTO categories(name, display_name) VALUES(${mysql_1.default.escape((0, globalFunc_1.displayNameToName)(req.body.category))}, ${mysql_1.default.escape(req.body.category)})`, (err, results) => __awaiter(this, void 0, void 0, function* () {
                        if (!err) {
                            insertProduct(req.body.title, req.body.available, req.body.price, results.insertId, req.body.description, req.body.pictures);
                            res.status(200).send();
                        }
                        else {
                            res.status(500).send("Une erreur est survenue");
                        }
                    }));
                }
                else {
                    res.status(500).send("Une erreur est survenue");
                }
            }
            else {
                res.status(500).send("Une erreur est survenue");
            }
        }));
    }
    else {
        res.status(400).send("Votre requête est mal formulée");
    }
}
exports.default = createProducts;

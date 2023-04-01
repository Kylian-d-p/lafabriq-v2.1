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
const globalFunc_1 = require("../globalFunc");
function updateInfos(id, title, available, price, category, description, pictures) {
    server_1.default.db.query(`UPDATE products SET title = ${mysql_1.default.escape(title)}, available = ${mysql_1.default.escape(available)}, price = ${mysql_1.default.escape(price)}, category = ${mysql_1.default.escape(category)}, description = ${mysql_1.default.escape(description)} WHERE id = ${mysql_1.default.escape(id)}`);
    server_1.default.db.query(`SELECT id, picture_path FROM products_pictures WHERE product_id = ${mysql_1.default.escape(id)}`, (err, result) => {
        if (!err) {
            if (result.length !== 0) {
                var linked_pictures = [];
                for (var res of result) {
                    if (pictures.indexOf(res["picture_path"]) < 0) {
                        server_1.default.db.query(`DELETE FROM products_pictures WHERE id = ${mysql_1.default.escape(res["id"])}`);
                    }
                    else {
                        linked_pictures.push(res["picture_path"]);
                    }
                }
                for (var picture of pictures) {
                    if (linked_pictures.indexOf(picture) < 0) {
                        server_1.default.db.query(`INSERT INTO products_pictures(product_id, picture_path) VALUES(${mysql_1.default.escape(id)}, ${mysql_1.default.escape(picture)})`);
                    }
                }
            }
        }
    });
}
function updateProducts(req, res) {
    if (typeof req.body.id === "number" && typeof req.body.title === "string" && typeof req.body.available === "boolean" && typeof req.body.price === "number" && typeof req.body.category === "string" && typeof req.body.description === "string" && typeof req.body.pictures === "object") {
        server_1.default.db.query(`SELECT id from categories WHERE name = ${mysql_1.default.escape(req.body.category)}`, (err, results) => __awaiter(this, void 0, void 0, function* () {
            if (results.length == 1) {
                updateInfos(req.body.id, req.body.title, req.body.available, req.body.price, results[0].id, req.body.description, req.body.pictures);
                res.status(200).send();
            }
            else if (results.length == 0) {
                server_1.default.db.query(`INSERT INTO categories(name, display_name) VALUES(${mysql_1.default.escape((0, globalFunc_1.displayNameToName)(req.body.category))}, ${mysql_1.default.escape(req.body.category)})`, (err, results) => __awaiter(this, void 0, void 0, function* () {
                    if (!err) {
                        updateInfos(req.body.id, req.body.title, req.body.available, req.body.price, results.insertId, req.body.description, req.body.pictures);
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
        }));
    }
    else {
        res.status(400).send("Votre requête est mal formulée");
    }
}
exports.default = updateProducts;

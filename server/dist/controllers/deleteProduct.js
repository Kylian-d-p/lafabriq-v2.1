"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const mysql_1 = __importDefault(require("mysql"));
const globalFunc_1 = require("../globalFunc");
function deleteProduct(req, res) {
    if (typeof req.body.id === "number") {
        server_1.default.db.query(`DELETE FROM products_pictures WHERE product_id = ${mysql_1.default.escape(req.body.id)}`, (err, result) => {
            if (err) {
                (0, globalFunc_1.log)(err, true);
                res.status(500).send("Une erreur est survenue");
            }
            else {
                server_1.default.db.query(`DELETE FROM products WHERE id = ${mysql_1.default.escape(req.body.id)}`, (err, result) => {
                    if (err) {
                        (0, globalFunc_1.log)(err, true);
                        res.status(500).send("une erreur est survenue");
                    }
                    else {
                        res.status(200).send();
                    }
                });
            }
        });
    }
    else {
        res.status(400).send("Votre requête est mal formulée");
    }
}
exports.default = deleteProduct;

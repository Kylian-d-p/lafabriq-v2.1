"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const mysql_1 = __importDefault(require("mysql"));
const globalFunc_1 = require("../globalFunc");
function getProduct(req, res) {
    if (typeof req.body.id == "string") {
        var final_result = {};
        server_1.default.db.query(`SELECT title, available, price, categories.display_name as category, categories.name as category_href, description FROM products INNER JOIN categories ON products.category = categories.id WHERE products.id = ${mysql_1.default.escape(req.body.id)}`, (err, result) => {
            if (err) {
                (0, globalFunc_1.log)(err, true);
                res.status(500).send("Une erreur interne est survenue");
            }
            else {
                if (result.length == 1) {
                    final_result = result[0];
                    server_1.default.db.query(`SELECT picture_path FROM products_pictures WHERE product_id = ${mysql_1.default.escape(req.body.id)}`, (err, result_2) => {
                        if (err) {
                            (0, globalFunc_1.log)(err, true);
                            res.status(500).send("Une erreur interne est survenue");
                        }
                        else {
                            final_result["pictures"] = [];
                            for (const picture of result_2) {
                                final_result["pictures"].push(picture.picture_path);
                            }
                            res.status(200).send(final_result);
                        }
                    });
                }
                else {
                    res.status(404).send("Ce produit n'existe pas");
                }
            }
        });
    }
    else {
        res.status(400).send("Une erreur est survenue");
    }
}
exports.default = getProduct;

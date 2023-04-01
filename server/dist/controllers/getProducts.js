"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const mysql_1 = __importDefault(require("mysql"));
const globalFunc_1 = require("../globalFunc");
function getProducts(req, res) {
    if (typeof req.body.category == "string") {
        server_1.default.db.query(`SELECT products.id, title, available, price, MIN(picture_path) as first_picture FROM products INNER JOIN products_pictures ON products.id = products_pictures.product_id INNER JOIN categories ON products.category = categories.id WHERE categories.name = ${mysql_1.default.escape(req.body.category)} GROUP BY products.id, title, available, price ORDER BY available DESC, id DESC`, (err, result) => {
            if (err) {
                (0, globalFunc_1.log)(err, true);
                res.status(500).send("Une erreur interne est survenue");
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    else {
        res.status(400).send("Une erreur est survenue");
    }
}
exports.default = getProducts;

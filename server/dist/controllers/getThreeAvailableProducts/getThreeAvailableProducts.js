"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalFunc_1 = require("../../globalFunc");
const server_1 = __importDefault(require("../../server"));
function getThreeAvailableProducts(req, res) {
    server_1.default.db.query(`SELECT products.id, title, available, price, MIN(picture_path) as first_picture FROM products INNER JOIN products_pictures ON products.id = products_pictures.product_id INNER JOIN categories ON products.category = categories.id WHERE products.available = 1 GROUP BY products.id, title, available, price ORDER BY id DESC LIMIT 3`, (err, result) => {
        if (err) {
            (0, globalFunc_1.log)(err, true);
            res.status(500).send("Une erreur interne est survenue");
        }
        else {
            res.status(200).json(result);
        }
    });
}
exports.default = getThreeAvailableProducts;

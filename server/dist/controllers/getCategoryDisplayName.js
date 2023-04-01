"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const mysql_1 = __importDefault(require("mysql"));
function getProduct(req, res) {
    if (typeof req.body.name == "string") {
        server_1.default.db.query(`SELECT display_name FROM categories WHERE name = ${mysql_1.default.escape(req.body.name)}`, (err, result) => {
            if (result.length == 1) {
                res.status(200).send(result[0].display_name);
            }
            else {
                res.status(500).send("Une erreur est survenue");
            }
        });
    }
    else {
        res.status(400).send("Une erreur est survenue");
    }
}
exports.default = getProduct;

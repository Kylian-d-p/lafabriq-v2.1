"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalFunc_1 = require("../globalFunc");
const server_1 = __importDefault(require("../server"));
function getCategories(req, res) {
    server_1.default.db.query("SELECT DISTINCT c.* FROM categories c INNER JOIN products p ON c.id = p.category", (err, results) => {
        if (err) {
            (0, globalFunc_1.log)(err, true);
            res.status(500).send("Une erreur interne est survenue");
        }
        else {
            res.status(200).json(results);
        }
    });
}
exports.default = getCategories;

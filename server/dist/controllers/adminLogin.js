"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function adminLogin(req, res) {
    if (typeof req.body.username === "string" && typeof req.body.password === "string") {
        if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
            const token = jsonwebtoken_1.default.sign({ "key": "value" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json(token);
        }
        else {
            res.status(404).send("Le nom d'utilisateur ou le mot de passe est incorrect");
        }
    }
    else {
        res.status(400).send("Une erreur est survenue");
    }
}
exports.default = adminLogin;

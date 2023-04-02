"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAdminConnected(req, res) {
    // Récupérez le JWT de l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // non autorisé si le JWT est manquant
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.status(200).send();
    }
    catch (err) {
        res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration");
    }
}
exports.default = isAdminConnected;

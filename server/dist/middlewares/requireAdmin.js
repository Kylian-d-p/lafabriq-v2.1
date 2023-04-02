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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Récupérez le JWT de l'en-tête Authorization
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401).send("JWT manquant"); // non autorisé si le JWT est manquant
        }
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch (err) {
            res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration");
        }
    });
}
exports.default = requireAdmin;

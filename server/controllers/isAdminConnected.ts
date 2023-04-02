import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function isAdminConnected(req: Request, res: Response) {
    // Récupérez le JWT de l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // non autorisé si le JWT est manquant
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send()
    } catch (err) {
        res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration")
    }
}
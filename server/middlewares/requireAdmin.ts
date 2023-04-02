import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    // Récupérez le JWT de l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401).send("JWT manquant"); // non autorisé si le JWT est manquant
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch (err) {
        res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration")
    }
}

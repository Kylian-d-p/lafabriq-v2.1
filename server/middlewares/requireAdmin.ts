import { Request, Response, NextFunction } from 'express';

export default async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!(typeof req.session.adminConnected === "boolean" && req.session.adminConnected === true)) {
        res.status(401).send("Vous n'êtes pas connecté")
        return
    }
    next();
}

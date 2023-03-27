import { Request, Response } from "express";

export default function isAdminConnected(req: Request, res: Response) {
    if (typeof req.session.adminConnected === "boolean" && req.session.adminConnected === true) {
        res.status(200).send()
    } else {
        res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration")
    }
}
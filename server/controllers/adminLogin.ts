import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function adminLogin(req: Request, res: Response) {
    if (typeof req.body.username === "string" && typeof req.body.password === "string") {
        if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ "key": "value" }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.status(200).json(token)
        } else {
            res.status(404).send("Le nom d'utilisateur ou le mot de passe est incorrect")
        }
    } else {
        res.status(400).send("Une erreur est survenue")
    }
}
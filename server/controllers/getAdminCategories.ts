import { Request, Response } from "express";
import { log } from "../globalFunc";
import db from "../server";

export default function getAdminCategories(req: Request, res: Response) {
    db.db.query("SELECT * FROM categories", (err, results) => {
        if (err) {
            log(err, true)
            res.status(500).send("Une erreur interne est survenue")
        } else {
            res.status(200).json(results)
        }
    })
}
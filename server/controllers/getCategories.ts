import { Request, Response } from "express";
import { log } from "../globalFunc";
import db from "../server";

export default function getCategories(req: Request, res: Response) {
    db.db.query("SELECT DISTINCT c.* FROM categories c INNER JOIN products p ON c.id = p.category", (err, results) => {
        if (err) {
            log(err, true)
            res.status(500).send("Une erreur interne est survenue")
        } else {
            res.status(200).json(results)
        }
    })
}
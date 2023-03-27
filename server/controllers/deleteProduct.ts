import { Response, Request } from "express"
import db from "../server"
import mysql from "mysql"
import { log } from "../globalFunc"

export default function deleteProduct(req: Request, res: Response) {
    if (typeof req.body.id === "number") {
        db.db.query(`DELETE FROM products_pictures WHERE product_id = ${mysql.escape(req.body.id)}`, (err, result) => {
            if (err) {
                log(err, true)
                res.status(500).send("Une erreur est survenue")
            } else {
                db.db.query(`DELETE FROM products WHERE id = ${mysql.escape(req.body.id)}`, (err, result) => {
                    if (err) {
                        log(err, true)
                        res.status(500).send("une erreur est survenue")
                    } else {
                        res.status(200).send()
                    }
                })
            }
        })
    } else {
        res.status(400).send("Votre requête est mal formulée")
    }
}
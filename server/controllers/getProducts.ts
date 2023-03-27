import { Request, Response } from "express"
import db from "../server"
import mysql from "mysql"
import { log } from "../globalFunc"


export default function getProducts(req: Request, res: Response) {
    if (typeof req.body.category == "string") {
        db.db.query(`SELECT products.id, title, available, price, MIN(picture_path) as first_picture FROM products INNER JOIN products_pictures ON products.id = products_pictures.product_id INNER JOIN categories ON products.category = categories.id WHERE categories.name = ${mysql.escape(req.body.category)} GROUP BY products.id, title, available, price ORDER BY available DESC, id DESC`, (err, result) => {
            if (err) {
                log(err, true)
                res.status(500).send("Une erreur interne est survenue")
            } else {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(400).send("Une erreur est survenue")
    }
}
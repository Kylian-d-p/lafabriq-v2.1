import { Request, Response } from "express"
import { log } from "../globalFunc"
import db from "../server"


export default function getThreeAvailableProducts(req: Request, res: Response) {
    db.db.query(`SELECT products.id, title, available, price, MIN(picture_path) as first_picture FROM products INNER JOIN products_pictures ON products.id = products_pictures.product_id INNER JOIN categories ON products.category = categories.id WHERE products.available = 1 GROUP BY products.id, title, available, price ORDER BY id DESC LIMIT 3`, (err, result) => {
        if (err) {
            log(err, true)
            res.status(500).send("Une erreur interne est survenue")
        } else {
            res.status(200).json(result)
        }
    })
}
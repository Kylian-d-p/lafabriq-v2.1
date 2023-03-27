import { Request, Response } from "express"
import db from "../server"
import mysql from "mysql"
import { log } from "../globalFunc";

interface firstRequestRes {
    title: string;
    available: boolean;
    price: number;
    category: string;
    desciption: string;
    pictures: Array<string>;
}

interface secondRequestRes {
    picture_path: string;
}

export default function getProduct(req: Request, res: Response) {
    if (typeof req.body.id == "string") {
        var final_result = {} as firstRequestRes
        db.db.query(`SELECT title, available, price, categories.display_name as category, categories.name as category_href, description FROM products INNER JOIN categories ON products.category = categories.id WHERE products.id = ${mysql.escape(req.body.id)}`, (err: mysql.MysqlError, result: Array<firstRequestRes>) => {
            if (err) {
                log(err, true)
                res.status(500).send("Une erreur interne est survenue")
            } else {
                if (result.length == 1) {
                    final_result = result[0]
                    db.db.query(`SELECT picture_path FROM products_pictures WHERE product_id = ${mysql.escape(req.body.id)}`, (err: mysql.MysqlError, result_2: Array<secondRequestRes>) => {
                        if (err) {
                            log(err, true)
                            res.status(500).send("Une erreur interne est survenue")
                        } else {
                            final_result["pictures"] = []
                            for (const picture of result_2) {
                                final_result["pictures"].push(picture.picture_path)
                            }
                            res.status(200).send(final_result)
                        }
                    })
                } else {
                    res.status(404).send("Ce produit n'existe pas")
                }
            }
        })
    } else {
        res.status(400).send("Une erreur est survenue")
    }
}
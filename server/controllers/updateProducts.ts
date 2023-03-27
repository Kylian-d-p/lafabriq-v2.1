import { Request, Response } from "express";
import db from "../server"
import mysql, { MysqlError } from "mysql"
import { displayNameToName } from "../globalFunc";

function updateInfos(id: number, title: string, available: boolean, price: number, category: number, description: string, pictures: Array<string>) {
    db.db.query(`UPDATE products SET title = ${mysql.escape(title)}, available = ${mysql.escape(available)}, price = ${mysql.escape(price)}, category = ${mysql.escape(category)}, description = ${mysql.escape(description)} WHERE id = ${mysql.escape(id)}`)
    db.db.query(`SELECT id, picture_path FROM products_pictures WHERE product_id = ${mysql.escape(id)}`, (err, result) => {
        if (!err) {
            if (result.length !== 0) {
                var linked_pictures: Array<string> = []
                for (var res of result) {
                    if (pictures.indexOf(res["picture_path"]) < 0) {
                        db.db.query(`DELETE FROM products_pictures WHERE id = ${mysql.escape(res["id"])}`)
                    } else {
                        linked_pictures.push(res["picture_path"])
                    }
                }
                for (var picture of pictures) {
                    if (linked_pictures.indexOf(picture) < 0) {
                        db.db.query(`INSERT INTO products_pictures(product_id, picture_path) VALUES(${mysql.escape(id)}, ${mysql.escape(picture)})`)
                    }
                }
            }
        }
    })
}

export default function updateProducts(req: Request, res: Response) {
    if (typeof req.body.id === "number" && typeof req.body.title === "string" && typeof req.body.available === "boolean" && typeof req.body.price === "number" && typeof req.body.category === "string" && typeof req.body.description === "string" && typeof req.body.pictures === "object") {
        db.db.query(`SELECT id from categories WHERE name = ${mysql.escape(req.body.category)}`, async (err: MysqlError, results: Array<{ id: number }>) => {
            if (results.length == 1) {
                updateInfos(req.body.id, req.body.title, req.body.available, req.body.price, results[0].id, req.body.description, req.body.pictures)
                res.status(200).send()
            } else if (results.length == 0) {
                db.db.query(`INSERT INTO categories(name, display_name) VALUES(${mysql.escape(displayNameToName(req.body.category))}, ${mysql.escape(req.body.category)})`, async (err: MysqlError, results: any) => {
                    if (!err) {
                        updateInfos(req.body.id, req.body.title, req.body.available, req.body.price, results.insertId, req.body.description, req.body.pictures)
                        res.status(200).send()
                    } else {
                        res.status(500).send("Une erreur est survenue")
                    }
                })
            } else {
                res.status(500).send("Une erreur est survenue")
            }
        })
    } else {
        res.status(400).send("Votre requête est mal formulée")
    }
}
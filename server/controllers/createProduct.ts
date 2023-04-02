import { Request, Response } from "express"
import db from "../server"
import mysql, { MysqlError } from "mysql"
import { constants, promises } from "fs"
import path from "path"
import { displayNameToName } from "../globalFunc"

function insertProduct(title: string, available: boolean, price: number, category: number, description: string, pictures: Array<string>) {
    db.db.query(`INSERT INTO products(title, available, price, category, description) VALUES (${mysql.escape(title)}, ${mysql.escape(available)}, ${mysql.escape(price)}, ${mysql.escape(category)}, ${mysql.escape(description.replace(/\n/g, "<br/>"))})`, async (err, result) => {
        for (var picture of pictures) {
            var fileExists = await checkFileExists(path.join(__dirname, '../../creations/'))
            if (fileExists) {
                db.db.query(`INSERT INTO products_pictures(product_id, picture_path) VALUES(${mysql.escape(result.insertId)}, ${mysql.escape(picture)})`)
            }
        }
    })
}

async function checkFileExists(path: string) {
    try {
        await promises.access(path, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

export default function createProducts(req: Request, res: Response) {
    if (typeof req.body.title === "string" && typeof req.body.category === "string" && typeof req.body.price === "number" && typeof req.body.description === "string" && typeof req.body.pictures === "object" && typeof req.body.available === "boolean") {
        db.db.query(`SELECT id from categories WHERE name = ${mysql.escape(req.body.category)}`, async (err: MysqlError, results: Array<{ id: number }>) => {
            if (!err) {
                if (results.length == 1) {
                    insertProduct(req.body.title, req.body.available, req.body.price, results[0].id, req.body.description, req.body.pictures)
                    res.status(200).send()
                } else if (results.length == 0) {
                    db.db.query(`INSERT INTO categories(name, display_name) VALUES(${mysql.escape(displayNameToName(req.body.category))}, ${mysql.escape(req.body.category)})`, async (err: MysqlError, results: any) => {
                        if (!err) {
                            insertProduct(req.body.title, req.body.available, req.body.price, results.insertId, req.body.description, req.body.pictures)
                            res.status(200).send()
                        } else {
                            res.status(500).send("Une erreur est survenue")
                        }
                    })
                } else {
                    res.status(500).send("Une erreur est survenue")
                }
            } else {
                res.status(500).send("Une erreur est survenue")
            }
        })
    } else {
        res.status(400).send("Votre requête est mal formulée")
    }
}
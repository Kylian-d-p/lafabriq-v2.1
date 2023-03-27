import { Request, Response } from "express"
import db from "../server"
import mysql, { MysqlError } from "mysql"

export default function getProduct(req: Request, res: Response) {
    if (typeof req.body.name == "string") {
        db.db.query(`SELECT display_name FROM categories WHERE name = ${mysql.escape(req.body.name)}`, (err: MysqlError, result: Array<{ display_name: string }>) => {
            if (result.length == 1) {
                res.status(200).send(result[0].display_name)
            } else {
                res.status(500).send("Une erreur est survenue")
            }
        })
    } else {
        res.status(400).send("Une erreur est survenue")
    }
}
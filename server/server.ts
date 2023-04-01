import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import getProducts from "./controllers/getProducts"
import fs from "fs"
import mysql from "mysql"
import getCategories from "./controllers/getCategories"
import getProduct from "./controllers/getProduct"
import getThreeAvailableProducts from "./controllers/getThreeAvailableProducts"
import getCategoryDisplayName from "./controllers/getCategoryDisplayName"
import session from "express-session"
import adminLogin from "./controllers/adminLogin"
import isAdminConnected from "./controllers/isAdminConnected"
import sharp from "sharp"
import multer from "multer"
import uploadCreations from "./controllers/uploadCreations"
import checkImageUpload from "./middlewares/checkIfImage"
import getAllPictures from "./controllers/getAllPictures"
import requireAdmin from "./middlewares/requireAdmin"
import createProducts from "./controllers/createProduct"
import updateProducts from "./controllers/updateProducts"
import getAdminCategories from "./controllers/getAdminCategories"
import deleteProduct from "./controllers/deleteProduct"
import cors from "cors"
import https from "https"
import { log } from "./globalFunc"
const storage = multer.memoryStorage()
const imageUpload = multer({ storage })

dotenv.config({ path: "../.env" })

const PORT: Number = process.env.PORT || 80
const MYSQL_HOST: string = process.env.MYSQL_HOST || ""
const MYSQL_USER: string = process.env.MYSQL_USER || ""
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || ""
const DB_NAME: string = process.env.DB_NAME || ""
const SECRET_SESSION: string = process.env.SECRET_SESSION || ""

const app: Express = express()


// Connexion à la base de données
const db = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: DB_NAME,
    charset: "utf8mb4"
})
db.connect(function (err) {
    if (err) {
        log(err, true)
    }
    log(`Connecté avec succès à la base de données ${DB_NAME}`, false)
})

app.use(cors())
app.use(express.json())
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}))
app.use("/images/creations/", express.static("creations/"))

app.post("/getProducts", getProducts)
app.post("/getCategories", getCategories)
app.post("/getProduct", getProduct)
app.post("/getThreeAvailableProducts", getThreeAvailableProducts)
app.post("/admin-login", adminLogin)
app.post("/isAdminConnected", isAdminConnected)
app.post("/uploadCreation", requireAdmin, imageUpload.array("file"), checkImageUpload, uploadCreations)
app.post("/getCategoryDisplayName", getCategoryDisplayName)
app.post("/getAllPictures", requireAdmin, getAllPictures)
app.post("/createProducts", requireAdmin, createProducts)
app.post("/updateProducts", requireAdmin, updateProducts)
app.post("/getAdminCategories", requireAdmin, getAdminCategories)
app.post("/deleteProduct", requireAdmin, deleteProduct)
app.post("/apiAvailable", (req: Request, res: Response) => {
    res.status(200).send("API disponible")
})

app.post("*", (req: Request, res: Response) => {
    res.status(404).send("Introuvable")
})

// https server
if (process.env.ENVIRONMENT === "prod") {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    }

    https.createServer(options, app).listen(PORT, () => {
        log(`Serveur HTTPS démarré sur le port ${PORT}`, false)
    })
} else {
    app.listen(PORT, () => {
        log(`Serveur HTTP démarré sur le port ${PORT}`, false)
    })
}



export default { db, sharp }
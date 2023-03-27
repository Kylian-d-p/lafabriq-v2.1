"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const getProducts_1 = __importDefault(require("./controllers/getProducts/getProducts"));
const path_1 = __importDefault(require("path"));
const mysql_1 = __importDefault(require("mysql"));
const getCategories_1 = __importDefault(require("./controllers/getCategories/getCategories"));
const getProduct_1 = __importDefault(require("./controllers/getProduct/getProduct"));
const getThreeAvailableProducts_1 = __importDefault(require("./controllers/getThreeAvailableProducts/getThreeAvailableProducts"));
const getCategoryDisplayName_1 = __importDefault(require("./controllers/getCategoryDisplayName/getCategoryDisplayName"));
const express_session_1 = __importDefault(require("express-session"));
const adminLogin_1 = __importDefault(require("./controllers/adminLogin/adminLogin"));
const isAdminConnected_1 = __importDefault(require("./controllers/isAdminConnected/isAdminConnected"));
const sharp_1 = __importDefault(require("sharp"));
const multer_1 = __importDefault(require("multer"));
const uploadCreations_1 = __importDefault(require("./controllers/uploadCreations/uploadCreations"));
const checkIfImage_1 = __importDefault(require("./middlewares/checkIfImage"));
const getAllPictures_1 = __importDefault(require("./controllers/getAllPictures/getAllPictures"));
const requireAdmin_1 = __importDefault(require("./middlewares/requireAdmin"));
const createProduct_1 = __importDefault(require("./controllers/createProduct/createProduct"));
const updateProducts_1 = __importDefault(require("./controllers/updateProducts/updateProducts"));
const getAdminCategories_1 = __importDefault(require("./controllers/getAdminCategories/getAdminCategories"));
const deleteProduct_1 = __importDefault(require("./controllers/deleteProduct/deleteProduct"));
const globalFunc_1 = require("./globalFunc");
const storage = multer_1.default.memoryStorage();
const imageUpload = (0, multer_1.default)({ storage });
dotenv_1.default.config({ path: "../.env" });
const PORT = process.env.PORT || 80;
const MYSQL_HOST = process.env.MYSQL_HOST || "";
const MYSQL_USER = process.env.MYSQL_USER || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "";
const SECRET_SESSION = process.env.SECRET_SESSION || "";
const app = (0, express_1.default)();
// Connexion à la base de données
const db = mysql_1.default.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: DB_NAME,
    charset: "utf8mb4"
});
db.connect(function (err) {
    if (err) {
        (0, globalFunc_1.log)(err, true);
    }
    (0, globalFunc_1.log)(`Connecté avec succès à la base de données ${DB_NAME}`, false);
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}));
app.use("/images/creations/", express_1.default.static("creations/"));
const root = path_1.default.join(__dirname, '../../client/build');
app.use(express_1.default.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
});
app.post("/getProducts", getProducts_1.default);
app.post("/getCategories", getCategories_1.default);
app.post("/getProduct", getProduct_1.default);
app.post("/getThreeAvailableProducts", getThreeAvailableProducts_1.default);
app.post("/admin-login", adminLogin_1.default);
app.post("/isAdminConnected", isAdminConnected_1.default);
app.post("/uploadCreation", requireAdmin_1.default, imageUpload.array("file"), checkIfImage_1.default, uploadCreations_1.default);
app.post("/getCategoryDisplayName", getCategoryDisplayName_1.default);
app.post("/getAllPictures", requireAdmin_1.default, getAllPictures_1.default);
app.post("/createProducts", requireAdmin_1.default, createProduct_1.default);
app.post("/updateProducts", requireAdmin_1.default, updateProducts_1.default);
app.post("/getAdminCategories", requireAdmin_1.default, getAdminCategories_1.default);
app.post("/deleteProduct", requireAdmin_1.default, deleteProduct_1.default);
app.post("*", (req, res) => {
    res.status(404).send("Introuvable");
});
app.listen(PORT, () => {
    (0, globalFunc_1.log)(`Le serveur écoute sur le port ${PORT}`, false);
});
exports.default = { db, sharp: sharp_1.default };

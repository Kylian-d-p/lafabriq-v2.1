"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminLogin(req, res) {
    if (typeof req.body.username === "string" && typeof req.body.password === "string") {
        if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
            req.session.adminConnected = true;
            res.status(200).send();
        }
        else {
            res.status(404).send("Le nom d'utilisateur ou le mot de passe est incorrect");
        }
    }
    else {
        res.status(400).send("Une erreur est survenue");
    }
}
exports.default = adminLogin;

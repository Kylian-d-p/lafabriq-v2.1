"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAdminConnected(req, res) {
    if (typeof req.session.adminConnected === "boolean" && req.session.adminConnected === true) {
        res.status(200).send();
    }
    else {
        res.status(401).send("Vous n'êtes pas connecté à l'espace d'administration");
    }
}
exports.default = isAdminConnected;

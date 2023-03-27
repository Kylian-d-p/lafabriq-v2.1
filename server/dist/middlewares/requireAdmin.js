"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function requireAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(typeof req.session.adminConnected === "boolean" && req.session.adminConnected === true)) {
            res.status(401).send("Vous n'êtes pas connecté");
            return;
        }
        next();
    });
}
exports.default = requireAdmin;

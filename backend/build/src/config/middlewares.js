"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
exports.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token']
        || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.CONFIG.jwt_encryption, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
//# sourceMappingURL=middlewares.js.map
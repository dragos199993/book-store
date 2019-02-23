"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
exports.authorize = express_jwt_1.default({
    secret: 'test'
});
//# sourceMappingURL=config.js.map
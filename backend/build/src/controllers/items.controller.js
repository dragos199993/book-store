"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express = __importStar(require("express"));
const passport = require("passport");
const item_model_1 = __importDefault(require("../models/item.model"));
const router = express.Router();
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.sendStatus(403);
    }
};
router.route('/').get(passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    const items = yield item_model_1.default.find();
    return res.status(200).json(items);
}));
router.route('/').post(bodyParser.json(), (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const item = new item_model_1.default(request.body);
        yield item.save();
        return response.status(200).json('Item saved!');
    }
    catch (error) {
        return response.status(400).send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=items.controller.js.map
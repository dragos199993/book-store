"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const await_to_js_1 = require("await-to-js");
const pe = require("parse-error");
exports.to = (promise) => __awaiter(this, void 0, void 0, function* () {
    let err;
    let res;
    [err, res] = yield await_to_js_1.to(promise);
    if (err) {
        return [pe(err)];
    }
    return [null, res];
});
exports.TE = (errMessage, log) => {
    if (log === true) {
        console.error(errMessage);
    }
    throw new Error(errMessage);
};
//# sourceMappingURL=util.service.js.map
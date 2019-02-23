"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchemaDef = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
};
const userSchema = new mongoose_1.Schema(userSchemaDef);
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.model.js.map
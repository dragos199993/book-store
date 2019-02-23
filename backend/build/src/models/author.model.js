"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AuthorSchemaDef = {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
};
const AuthorSchema = new mongoose_1.Schema(AuthorSchemaDef);
exports.default = mongoose_1.model('Author', AuthorSchema);
//# sourceMappingURL=author.model.js.map
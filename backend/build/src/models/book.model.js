"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchemaDef = {
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }
};
const BookSchema = new mongoose_1.Schema(BookSchemaDef);
exports.default = mongoose_1.model('Book', BookSchema);
//# sourceMappingURL=book.model.js.map
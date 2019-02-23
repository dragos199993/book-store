"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchemaDef = {
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
};
const itemSchema = new mongoose_1.Schema(itemSchemaDef);
exports.default = mongoose_1.model('Item', itemSchema);
//# sourceMappingURL=item.model.js.map
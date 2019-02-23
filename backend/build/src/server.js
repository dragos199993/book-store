"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const app_1 = __importDefault(require("./app"));
const url = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;
mongoose.connect(url, { useNewUrlParser: true }, () => console.log('Connected to mongodb...'));
app_1.default.listen(port);
console.log(`Server listening on port ${port}...`);
//# sourceMappingURL=server.js.map
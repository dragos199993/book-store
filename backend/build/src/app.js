"use strict";
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
const bodyParser = require("body-parser");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = __importDefault(require("./models/schema"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/graphql', express_graphql_1.default({ schema: schema_1.default, graphiql: true }));
app.use(express_1.default.static(path_1.default.resolve('..', 'frontend', 'build')));
app.get('*', (request, response) => {
    response.sendFile(path_1.default.resolve('..', 'frontend', 'build', 'index.html'));
});
exports.default = app;
//# sourceMappingURL=app.js.map
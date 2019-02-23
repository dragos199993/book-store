"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = __importDefault(require("mongodb-memory-server"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const item_model_1 = __importDefault(require("../models/item.model"));
describe('/api/items tests', () => {
    const mongod = new mongodb_memory_server_1.default();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const uri = yield mongod.getConnectionString();
        yield mongoose_1.default.connect(uri, { useNewUrlParser: true });
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongod.stop();
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const item = new item_model_1.default();
        item.name = 'test';
        item.value = 10;
        yield item.save();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield item_model_1.default.remove({});
    }));
    it('should get items', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/api/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([expect.objectContaining({ name: 'test', value: 10 })]);
    }));
    it('should post items', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/api/items')
            .send({ name: 'new item', value: 2000 });
        expect(response.status).toBe(200);
        expect(response.body).toBe('Item saved!');
    }));
    it('should catch errors when posting items', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/api/items')
            .send({});
        expect(response.status).toBe(400);
    }));
});
//# sourceMappingURL=items.test.js.map
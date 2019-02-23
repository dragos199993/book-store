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
const lodash_1 = __importDefault(require("lodash"));
const mongodb_memory_server_1 = __importDefault(require("mongodb-memory-server"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const user_model_1 = __importDefault(require("../models/user.model"));
describe('/api/users tests', () => {
    const mongod = new mongodb_memory_server_1.default();
    const registerNewUser = () => {
        return supertest_1.default(app_1.default)
            .post('/api/users/register')
            .send({ email: 'new@user.com', password: 'test-password' });
    };
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const uri = yield mongod.getConnectionString();
        yield mongoose_1.default.connect(uri, { useNewUrlParser: true });
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongod.stop();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield user_model_1.default.remove({});
    }));
    it('should register user', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield registerNewUser();
        expect(response.status).toBe(200);
        expect(lodash_1.default.keys(response.body)).toEqual(['token', 'expiry']);
    }));
    it('should catch errors when registering user', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/api/users/register')
            .send({});
        expect(response.status).toBe(400);
    }));
    it('should login user', () => __awaiter(this, void 0, void 0, function* () {
        yield registerNewUser();
        const response = yield supertest_1.default(app_1.default)
            .post('/api/users/login')
            .send({ email: 'new@user.com', password: 'test-password' });
        expect(response.status).toBe(200);
        expect(lodash_1.default.keys(response.body)).toEqual(['token', 'expiry']);
    }));
    it('should return invalid credentials error when login is invalid', () => __awaiter(this, void 0, void 0, function* () {
        yield registerNewUser();
        const response = yield supertest_1.default(app_1.default)
            .post('/api/users/login')
            .send({ email: 'new@user.com', password: 'wrong-password' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid credentials' });
    }));
    it('should get user profile', () => __awaiter(this, void 0, void 0, function* () {
        const register = yield registerNewUser();
        const response = yield supertest_1.default(app_1.default)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${register.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe('new@user.com');
    }));
});
//# sourceMappingURL=users.test.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const secret = process.env.JWT_SECRET;
const user_model_1 = __importDefault(require("../models/user.model"));
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
exports.passportJWT = (passport) => {
    passport.use(new passport_jwt_1.Strategy(opts, (payload, done) => {
        user_model_1.default.findById(payload.id)
            .then((user) => {
            if (user) {
                return done(null, { id: user.id, name: user.name, email: user.email });
            }
            return done(null, false);
        })
            .catch((err) => console.log(err));
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
};
//# sourceMappingURL=passport.js.map
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.default.Router();
router.route('/register').post((req, res) => __awaiter(this, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill all fields' });
    }
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.status(500).json(errors);
    }
    else {
        user_model_1.default.findOne({ email })
            .then((user) => {
            if (user) {
                errors.push({ msg: 'Email is already used by another account' });
                res.status(500).json(errors);
            }
            else {
                const newUser = new user_model_1.default({ name, email, password });
                bcryptjs_1.default.genSalt(10, (err, salt) => bcryptjs_1.default.hash(newUser.password, salt, (saltErr, hash) => {
                    if (saltErr) {
                        throw saltErr;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then((createdUser) => {
                        res.json({ success: createdUser });
                    })
                        .catch((createErr) => console.log(createErr));
                }));
            }
        });
    }
}));
router.route('/login').post((req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const errors = [];
    if (!email || !password) {
        errors.push({ msg: 'Please fill all fields' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.status(500).json(errors);
    }
    else {
        user_model_1.default.findOne({ email })
            .then((user) => {
            if (!user) {
                errors.push({ msg: 'No account found' });
                res.status(500).json(errors);
            }
            bcryptjs_1.default.compare(password, user.password)
                .then((isMatch) => {
                if (isMatch) {
                    const payload = {
                        id: user._id,
                        name: user.name
                    };
                    jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION }, (err, token) => {
                        if (err) {
                            errors.push({ msg: 'Failed to generate a token' });
                            res.status(500).json(errors);
                        }
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    });
                }
                else {
                    errors.push({ msg: 'Password incorrect' });
                    res.status(500).json(errors);
                }
            });
        });
    }
}));
exports.default = router;
//# sourceMappingURL=users.controller.js.map
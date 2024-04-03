"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../model");
const utils_1 = require("../utils");
class AuthService {
    async signUp(user) {
        const findUser = await model_1.Users.findOne({ email: user.email });
        if (findUser)
            throw new utils_1.ErrorHandler('Email already exist', 400);
        const newUser = await model_1.Users.create(user);
        return newUser;
    }
    async login(user) {
        const profile = await model_1.Users.findOne({ email: user.email }).select('+password');
        // check if profile exist
        if (!profile)
            throw new utils_1.ErrorHandler('Invalid email or password', 400);
        const comparePassword = await profile.comparepassword(user.password);
        if (!comparePassword)
            throw new utils_1.ErrorHandler('Invalid email or password', 400);
        const { token } = this.createToken(profile);
        return { token, user: profile };
    }
    createToken(user) {
        const dataStoredInToken = { id: user._id };
        const secretKey = process.env.JWT_SECRET_KEY;
        return {
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secretKey, {})
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
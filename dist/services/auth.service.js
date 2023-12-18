"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield model_1.Users.findOne({ email: user.email });
            if (findUser)
                throw new utils_1.ErrorHandler('Email already exist', 400);
            const newUser = yield model_1.Users.create(user);
            return newUser;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield model_1.Users.findOne({ email: user.email }).select('+password');
            // check if profile exist
            if (!profile)
                throw new utils_1.ErrorHandler('Invalid email or password', 400);
            const comparePassword = yield profile.comparepassword(user.password);
            if (!comparePassword)
                throw new utils_1.ErrorHandler('Invalid email or password', 400);
            const { token } = this.createToken(profile);
            return { token, user: profile };
        });
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
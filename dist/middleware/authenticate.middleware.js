"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const model_1 = require("../model");
const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization']?.split(' ')[1] || null;
        if (authorization) {
            const verificationId = jsonwebtoken_1.default.verify(authorization, process.env.JWT_SECRET_KEY);
            const userId = verificationId.id;
            const findUser = await model_1.Users.findById(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new utils_1.ErrorHandler('Authorisation token Invalid', 400));
            }
        }
        else {
            next(new utils_1.ErrorHandler('Authorisation token missing', 400));
        }
    }
    catch (error) {
        next(new utils_1.ErrorHandler('Wrong token', 400));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map
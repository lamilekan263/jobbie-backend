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
exports.authenticate = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const model_1 = require("../model");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authorization = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || null;
        if (authorization) {
            const verificationId = jsonwebtoken_1.default.verify(authorization, process.env.JWT_SECRET_KEY);
            const userId = verificationId.id;
            const findUser = yield model_1.Users.findById(userId);
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
});
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../services");
class AuthController {
    async signUp(req, res, next) {
        try {
            const userInput = req.body;
            await services_1.authService.signUp(userInput);
            return res.status(201).json({
                success: true,
                message: 'Registration successful, Please Login'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const loginIput = req.body;
            const { token, user } = await services_1.authService.login(loginIput);
            return res.status(200).json({
                token,
                user
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            return res.status(200).json({
                success: true,
                message: 'Log out successful'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
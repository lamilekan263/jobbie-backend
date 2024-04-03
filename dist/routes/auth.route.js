"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const dto_1 = require("../dto");
class AuthRoute {
    router = (0, express_1.Router)();
    authController = new controllers_1.AuthController();
    path = '/auth';
    constructor() {
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(`${this.path}/sign-up`, (0, middleware_1.validationMiddleware)(dto_1.CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}/login`, (0, middleware_1.validationMiddleware)(dto_1.LoginUserDto, 'body'), this.authController.login);
        this.router.post(`${this.path}/logout`, this.authController.logout);
    }
    getRouter() {
        return this.router;
    }
}
const authRoute = new AuthRoute();
exports.AuthRouter = authRoute.getRouter();
//# sourceMappingURL=auth.route.js.map
import express, { Router } from 'express';
import { AuthController } from '../controllers';
import { validationMiddleware } from '../middleware';
import { CreateUserDto, LoginUserDto } from '../dto';


class AuthRoute {
    private router = Router();
    private authController = new AuthController();
    private path = '/auth'
    constructor() {
        this.initializeRoute()
    }
    private initializeRoute() {
        this.router.post(`${this.path}/sign-up`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp)
        this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.login)
        this.router.post(`${this.path}/logout`, this.authController.logout)
    }


    getRouter() {
        return this.router
    }
}
const authRoute = new AuthRoute();

export const AuthRouter = authRoute.getRouter();



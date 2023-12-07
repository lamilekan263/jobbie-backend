import { Request, Response, NextFunction } from 'express'
import { CreateUserDto, LoginUserDto } from '../dto';
import { authService } from '../services';





export class AuthController {

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const userInput: CreateUserDto = req.body;
          
             await authService.signUp(userInput);

            return res.status(201).json({
                success: true,
                message: 'Registration successful, Please Login'
            })
        } catch (error) {
            next(error)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginIput: LoginUserDto = req.body;
          
            const { token, user } = await authService.login(loginIput)
           
            return res.status(200).json({
                token, 
                user
            })
        } catch (error) {
            next(error)
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction)  {
        try {
            return res.status(200).json({
                success: true,
                message: 'Log out successful'
            })
        } catch (error) {
             next(error)
        }
    }
}


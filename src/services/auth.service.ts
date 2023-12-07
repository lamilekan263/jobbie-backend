require('dotenv').config()
import jwt, { Secret } from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto } from "../dto";
import { Users } from "../model";
import { ErrorHandler } from "../utils";
import { IDataStoredInToken, IToken, IUser } from '../interface';



class AuthService {

    public async signUp(user: CreateUserDto) {

        const findUser = await Users.findOne({ email: user.email });

        if (findUser) throw new ErrorHandler('Email already exist', 400);

        const newUser = await Users.create(user);

        return newUser
    }


    public async login(user: LoginUserDto) {

        const profile = await Users.findOne({ email: user.email }).select('+password');
        // check if profile exist
        
        if (!profile) throw new ErrorHandler('Invalid email or password', 400);
       
        const comparePassword = await profile.comparepassword(user.password);
   
        if (!comparePassword) throw new ErrorHandler('Invalid email or password', 400);

        const { token } = this.createToken(profile)

        return { token, user: profile }
    }

    private createToken(user: IUser): IToken {
        const dataStoredInToken: IDataStoredInToken = { id: user._id }
      
        const secretKey = process.env.JWT_SECRET_KEY as Secret
        return {
            token: jwt.sign(dataStoredInToken, secretKey, {  })
        }
    }


}


export const authService = new AuthService();

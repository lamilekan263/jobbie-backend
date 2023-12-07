require('dotenv').config()
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken'
import { ErrorHandler } from "../utils";
import { Users } from "../model";
import { IDataStoredInToken } from "../interface";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {


    try {

        const authorization = req.headers['authorization']?.split(' ')[1] || null;

        if (authorization) {
            const verificationId = jwt.verify(authorization, process.env.JWT_SECRET_KEY as Secret) as IDataStoredInToken;
            const userId = verificationId.id;

            const findUser = await Users.findById(userId);

            if (findUser) {
                req.user = findUser
                next()
            } else {
                next(new ErrorHandler('Authorisation token Invalid', 400))
            }
        } else {
            next(new ErrorHandler('Authorisation token missing', 400))
        }
    } catch (error) {
        next(new ErrorHandler('Wrong token', 400))
    }


}
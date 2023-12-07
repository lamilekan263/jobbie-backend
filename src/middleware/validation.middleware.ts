import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils";



export const validationMiddleware = (type: any, value: string | 'body' | 'query' | 'params' = 'body') => {

    return async (req: Request, res: Response, next: NextFunction) => {
        const validateError = await validate(plainToClass(type, (req as any)[value]));

        if (validateError.length > 0) {
            const message = validateError.map(error => error.constraints ? Object.values(error.constraints) : []).join(', ');
            next(new ErrorHandler(message, 400))
        } {
            next()
        }

    }
}
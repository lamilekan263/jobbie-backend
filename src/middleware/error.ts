import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils";



export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

   
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errPath: err.path
    })


}



import { Request, Router } from "express";
import { IUser } from "./user.interface";


export interface IToken {
    token: string,
}

export interface IDataStoredInToken {
    id: number
}

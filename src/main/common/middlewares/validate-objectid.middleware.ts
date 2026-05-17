import { Request, Response, RequestHandler } from "express";
import { NextFunction } from "express-serve-static-core";
import { IMiddleware } from "../interfaces/middleware.interface.js";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";


export class ValidateObjectIdMiddleware implements IMiddleware{
    private readonly paramName: string;
    
    constructor(paramName = 'id') {
        this.paramName = paramName
    }

    public execute: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[this.paramName]

        if (!id){
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Parameter "${this.paramName}" is required'
            })
        }

        const idValue = Array.isArray(id) ? id[0] : id;

        if (!Types.ObjectId.isValid(idValue)){
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: `Invalid ObjectId format for ${this.paramName}`,
            });
            return;
    
        }

        next();
    }
}
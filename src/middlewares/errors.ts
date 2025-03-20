import { Request, Response,  NextFunction } from "express";
import { HttpExecption } from "../exeptions/root";

export const errorMiddlewere = (error: HttpExecption, req:Request, res:Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCodes: error.errorCode,
        errors: error.errors
    })
} 
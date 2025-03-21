import { Request,Response,NextFunction } from "express"
import { ErrorCodes, HttpExecption } from "./exeptions/root"
import { InternalExeption } from "./exeptions/internal-exeption"
import { ZodError } from "zod"
import { BadRequestsExeption } from "./exeptions/bad-request"

export const errorHandler = (method: Function) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exeption:HttpExecption;
            if (error instanceof HttpExecption) {
                exeption = error;
            } else {
                if (error instanceof ZodError) {
                    exeption = new BadRequestsExeption('Unprocessable entity.', ErrorCodes.UNPROCESSABLE_ENTITY)
                } else {
                    exeption = new InternalExeption('Something went wrong!', error, ErrorCodes.INTERNAL_SERVER_ERROR)
                }
            }
            next(exeption)
        }
    }
}
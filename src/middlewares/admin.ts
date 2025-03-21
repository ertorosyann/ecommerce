import { UnauthorizedExecption } from "../exeptions/unauthorized";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../exeptions/root";
import { prismaClient } from "../server";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from "../types/express";


const adminMiddleware = async(req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    const user = req.user;
    console.log(user?.role);
    
    if (user?.role == "ADMIN") {
        next()
    } else {
        next(new UnauthorizedExecption('Unauthorized', ErrorCodes.UNAUTHORIZED))
    }
}

export default adminMiddleware;
import { UnauthorizedExecption } from "../exeptions/unauthorized";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../exeptions/root";
import { prismaClient } from "../server";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from "../types/express";


const authMiddleware = async(req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if(!token) {
       return next(new UnauthorizedExecption('Unauthorized', ErrorCodes.UNAUTHORIZED))    
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;

        const user = await prismaClient.user.findFirst({where:{id: payload.userId}})
        if (!user) {
            return next(new UnauthorizedExecption('Unauthorized', ErrorCodes.UNAUTHORIZED))    
        }
        
        req.user = user;
        next()
    } catch (error) {
        next(new UnauthorizedExecption('Unauthorized', ErrorCodes.UNAUTHORIZED))    
    }
}

export default authMiddleware;
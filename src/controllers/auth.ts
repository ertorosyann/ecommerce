import { BadRequestsExeption } from "../exeptions/bad-request";
import {  Request, NextFunction, Response, RequestHandler } from "express"
import { ErrorCodes } from "../exeptions/root";
import {hashSync, compareSync} from "bcrypt"
import { prismaClient } from "../server";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken';
import { SignupSchema } from "../schema/users";
import { NotFoundExeption } from "../exeptions/not-found";
import { AuthenticatedRequest } from "../types/express";

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    
    SignupSchema.parse(req.body);

    const {email, password, name} = req.body;
    
    let user = await prismaClient.user.findFirst({where: {email}})
    if (user)  {
        new BadRequestsExeption('User already exists!', ErrorCodes.USER_ALREADY_EXISTS)
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.status(201).json(user);
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user) {
         throw (new NotFoundExeption('User does not Found!',ErrorCodes.USER_NOT_FOUND))
    }
    
    if (!compareSync(password, user.password)) {
        throw (new BadRequestsExeption('Incorecct password',ErrorCodes.INCORRECT_PASSWORD))
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({user,token});
}

export const me = async (req: AuthenticatedRequest, res: Response) => {
   res.json(req.user);
}
import { AddressSchema, ChangeUserRole, UpdateUserSchema } from "../schema/users"
import { BadRequestsExeption } from "../exeptions/bad-request"
import { NotFoundExeption } from "../exeptions/not-found"
import { AuthenticatedRequest } from "../types/express"
import { ErrorCodes } from "../exeptions/root"
import { Request, Response } from "express"
import { Address } from "@prisma/client"
import { prismaClient } from "../server"

export const addAddress = async(req:AuthenticatedRequest, res: Response) => {
    AddressSchema.parse(req.body)

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user?.id
        }
    })
    res.json(address)
}

export const deleteAddress = async(req:Request, res: Response) => {
        try {
            await prismaClient.address.delete({
                where:{ 
                    id: Number(req.params.id)
                }
            })
            res.status(200).json({success: true})
        } catch (error) {
            throw new NotFoundExeption('ADDRESS NOT FOUND', ErrorCodes.ADDRES_NOT_FOUND)
        }
}

export const listAddress = async(req:AuthenticatedRequest, res: Response) => {
    const address = await prismaClient.address.findMany({
        where:{
            userId: req.user?.id
        }
    })

    res.status(200).json(address);
}

export const updateAddress = async(req:AuthenticatedRequest, res:Response) => {
    const validatedData = UpdateUserSchema.parse(req.body);

    let shippingAddres: Address;
    let billingAddres: Address;
    
    if (validatedData.defaultShippingAddress) {
        try {
            shippingAddres = await prismaClient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultShippingAddress 
                }
            })
        } catch (error) {
            throw new NotFoundExeption('ADDRESS NOT FOUND', ErrorCodes.ADDRES_NOT_FOUND)
        }
        if (shippingAddres.userId != req.user?.id ) {
            throw new BadRequestsExeption('Address does not belon to user', ErrorCodes.ADDRES_DOES_NOT_BELONG)
        }
    }

    if (validatedData.defaultBillingAddress) {
        try {
            billingAddres = await prismaClient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultBillingAddress 
                }
            })
           
        } catch (error) {
            throw new NotFoundExeption('ADDRESS NOT FOUND', ErrorCodes.ADDRES_NOT_FOUND)
        }
        if (billingAddres.userId != req.user?.id ) {
            throw new BadRequestsExeption('Address does not belon to user', ErrorCodes.ADDRES_DOES_NOT_BELONG)
        }
    }
    
    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user?.id
        },
        data: validatedData
    })
    
    res.json(updatedUser)
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany({
        skip: Number(req.query.skip) || 0,
        take: 5
    })
    return res.json(users)
}

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: Number(req.params.id)
            },
            include: {
                addresses: true
            }
        })
        
        return res.json(user)
    } catch (error) {
        throw new NotFoundExeption('User Not Found', ErrorCodes.USER_NOT_FOUND)
    }
}

export const changeUserRole = async (req: Request, res: Response) => {
    ChangeUserRole.parse(req.body)
    
    try {
        const user = await prismaClient.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                role: req.body.role
            }
        })
        
        return res.json(user)
    } catch (error) {
        throw new NotFoundExeption('User Not Found', ErrorCodes.USER_NOT_FOUND)
    }
}
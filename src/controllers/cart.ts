import { Request, Response } from 'express'
import { ChangeQuantitySchema, CreateCartSchema } from '../schema/cart'
import { NotFoundExeption } from '../exeptions/not-found'
import { ErrorCodes } from '../exeptions/root'
import { Product } from '@prisma/client'
import { prismaClient } from '../server'
import { AuthenticatedRequest } from '../types/express'
import { InternalExeption } from '../exeptions/internal-exeption'
import { UnauthorizedExecption } from '../exeptions/unauthorized'


export const addItemToCart = async (req: AuthenticatedRequest, res: Response) => {
    const validateData = CreateCartSchema.parse(req.body);
    let product : Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where:{
                id: validateData.productId
            }
        })
    } catch (error) {
        throw new NotFoundExeption('Product Not Found', ErrorCodes.PRODUCT_NOT_FOUND)
    }

    let cartItem = await prismaClient.cartItem.findFirst({
        where: {
            userId: req.user?.id,
            productId: validateData.productId
        }
    })

    if (cartItem) {
        cartItem = await prismaClient.cartItem.update({
            where:{
                id: cartItem.id
            },
            data:{
                quantity: cartItem.quantity + validateData.quantity
            }
        })
        return res.status(200).json({ message: 'Quantity updated'});
    }
    
    const newCartItem = await prismaClient.cartItem.create({
        data: {
            userId: Number(req.user?.id),
            productId: product.id,
            quantity: validateData.quantity
        }
    })    
    res.status(201).json({ message: 'Item added'})
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new NotFoundExeption('Product Not found', ErrorCodes.PRODUCT_NOT_FOUND)
        }
        throw new InternalExeption('Something went wrong !', ErrorCodes.INTERNAL_SERVER_ERROR, error)
    }
    res.status(200).json({success: true})
}

export const changeQuantity = async (req: AuthenticatedRequest, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body);

    const cartItem = await prismaClient.cartItem.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (!cartItem) {
        throw new NotFoundExeption("Cart Item Not Found", ErrorCodes.CART_ITEM_NOT_FOUND)
    }    

    if (cartItem.userId !== req.user?.id) {
        throw new UnauthorizedExecption('Yoy can not update this car item.', ErrorCodes.UNAUTHORIZED)
    }

    const updatedCart = await prismaClient.cartItem.update({
        where:{
            id: Number(req.params.id)
        },
        data: {
            quantity: validatedData.quantity
        }
    })

    res.json(updatedCart)
}

export const getCart = async (req: AuthenticatedRequest, res: Response) => {

    const cart = await prismaClient.cartItem.findMany({
        where:{
            userId: Number(req.user?.id)
        },
        include:{
            product: true
        }
    }) 

    res.json(cart)
}
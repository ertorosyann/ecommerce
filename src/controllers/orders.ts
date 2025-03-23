import { Request, Response } from 'express'
import { prismaClient } from '../server'
import { AuthenticatedRequest } from '../types/express'
import { json } from 'stream/consumers'
import { BadRequestsExeption } from '../exeptions/bad-request'
import { ErrorCodes } from '../exeptions/root'
import { NotFoundExeption } from '../exeptions/not-found'


export const createOrder = async(req:AuthenticatedRequest, res:Response) => {
    // 1. to create a transaction 
     
    // 2. to list all  the cart items and processed if cart is not empty
    // 3. calculate the total amount 
    // 4. fetch address of user 
    // 5. to define computed field for formatted address on address module
    // 6. we will create a aorder and order productsorder products 
    // 7. create event
    // 8. to empty Cart

    return await prismaClient.$transaction(async (tx) => {
        const cartItem = await tx.cartItem.findMany({
            where: { userId: Number(req.user?.id) },
            include: { product: true }
        });
    
        if (cartItem.length === 0) {
            return res.json({ message: "Cart is empty" });
        }
    
        const price = cartItem.reduce((prec, current) => {
            return prec + current.quantity * Number(current.product.price);
        }, 0);
    
        const address = await tx.address.findFirst({
            where: { id: req.user?.defaultShippingAddress || undefined }
        });
    
        if (!address?.formattedAddress) {
            throw new BadRequestsExeption("Address is required", ErrorCodes.INVALID_ADDRESS);
        }
    
        const order = await tx.order.create({
            data: {
                user: { connect: { id: req.user?.id } },
                netAmount: price,
                address: address?.formattedAddress,
                products: {
                    create: cartItem.map((cart) => ({
                        quantity: cart.quantity,
                        address: address?.formattedAddress,
                        product: { connect: { id: cart.productId } }
                    }))
                }
            }
        });
        
        await tx.orderEvent.create({
            data: {
                orderId: order.id,
                address: address?.formattedAddress
            }
        });
    
        await tx.cartItem.deleteMany({ where: { userId: req.user?.id } });
    
        return res.json(order); 
    })
    
}

export const listOrders = async(req:AuthenticatedRequest, res:Response) => {
    const orders = await prismaClient.order.findMany({
        where:{
            userId: req.user?.id
        }
    })
    return res.json(orders);
}

export const cancelOrder = async(req:Request, res:Response) => {
    // 1. wrap it inside transaction
    // 2. check if the users is cancelling its own order
    try {
        const order = await prismaClient.order.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                status: 'CANCELEED'
            }
        })

        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: 'CANCELEED',
                address: order.address
            }
        })

        return res.json(order);
    } catch (error) {
        throw new NotFoundExeption('Order Not found !', ErrorCodes.ORDER_NOT_FOUND)
    }
}

export const getOrderById = async(req:Request, res:Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where:{
                id: Number(req.params.id)
            },
            include:{
                products: true,
                events: true
            }
        })

        res.json(order)
    } catch (error) {
        throw new NotFoundExeption('Order Not found !', ErrorCodes.ORDER_NOT_FOUND)
    }
}
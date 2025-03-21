import {Request, Response} from 'express';
import { prismaClient } from '../server';
import { ProductCreateSchema } from '../schema/products';
import { NotFoundExeption } from '../exeptions/not-found';
import { ErrorCodes } from '../exeptions/root';

export const createProduct = async(req: Request, res: Response) => {

    ProductCreateSchema.parse(req.body)

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    console.log(product);
    
    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    try {   
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',')
        }
        const updateProduct = await prismaClient.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: product
        })
        res.json(updateProduct)

    } catch (error) {
        throw new NotFoundExeption('Product Not Found',ErrorCodes.PRODUCT_NOT_FOUND)
    }
}

export const listProduct = async (req: Request, res: Response) => {
    try {
        const count = await prismaClient.product.count()
        const products = await prismaClient.product.findMany({
            skip: Number(req.query.skip) || 0,
            take: 5
        })

        res.json({
            count,
            data: products
        })
    } catch (error) {
        throw new NotFoundExeption("Not Found", ErrorCodes.USER_NOT_FOUND)
    }
}

export const getProductId = async (req: Request, res: Response) => {
    try {

        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: Number(req.params.id)
            }
        })

        res.json(product);

    } catch (error) {
        throw new NotFoundExeption("Not in this ID Not Found", ErrorCodes.USER_NOT_FOUND)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleteProduct = await prismaClient.product.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.json(deleteProduct);

    } catch (error) {
        throw new NotFoundExeption('User Not FOUND', ErrorCodes.USER_NOT_FOUND)
    }
}
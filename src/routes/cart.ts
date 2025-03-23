import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";


const cartRoute: Router = Router()

cartRoute.post('/', [authMiddleware], errorHandler(addItemToCart))
cartRoute.get('/', [authMiddleware], errorHandler(getCart))
cartRoute.delete('/:id', [authMiddleware], errorHandler(deleteItemFromCart))
cartRoute.put('/:id', [authMiddleware], errorHandler(changeQuantity))

export default cartRoute;
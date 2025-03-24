import productsRoutes from "./products";
import usersRoueter from "./users";
import { Router } from "express";
import authRoutes from "./auth";
import cartRoute from "./cart";
import orderRoutes from "./orders";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productsRoutes)
rootRouter.use('/users', usersRoueter)
rootRouter.use('/carts', cartRoute)
rootRouter.use('/orders', orderRoutes)

export default rootRouter;
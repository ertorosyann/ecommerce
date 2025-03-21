import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import usersRoueter from "./users";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productsRoutes)
rootRouter.use('/users', usersRoueter)

export default rootRouter;
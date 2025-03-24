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

//   1. user managment 
//      a. list users
//      c. get user by id
//      b. change user role
//  2.  order managment 
//      a. list all orders (fillter on status)
//      b. change order status
//      c. list oll orders of given user
//  3.  products
//      a. search api for products (for both users and admins) => full text search

//  .
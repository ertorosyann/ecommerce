import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAddress, updateAddress } from "../controllers/users";


const usersRoueter:Router = Router()

usersRoueter.post('/address', [authMiddleware,adminMiddleware], errorHandler(addAddress))
usersRoueter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress))
usersRoueter.get('/address', [authMiddleware], errorHandler(listAddress))
usersRoueter.put('/', [authMiddleware], errorHandler(updateAddress))

export default usersRoueter
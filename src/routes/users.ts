import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateAddress } from "../controllers/users";


const usersRoueter:Router = Router()

usersRoueter.post('/address', [authMiddleware,adminMiddleware], errorHandler(addAddress))
usersRoueter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress))
usersRoueter.get('/address', [authMiddleware], errorHandler(listAddress))
usersRoueter.put('/', [authMiddleware], errorHandler(updateAddress))
usersRoueter.put('/:id/role', [authMiddleware, adminMiddleware], errorHandler(changeUserRole))
usersRoueter.get('/', [authMiddleware,adminMiddleware], errorHandler(listUsers))
usersRoueter.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getUserById))

export default usersRoueter
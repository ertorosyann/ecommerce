import { login, me, signup } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error-handler';
import {Router} from 'express';

const authRoutes:Router = Router()

authRoutes.post('/signup',errorHandler(signup))
authRoutes.post('/login', errorHandler(login))
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes
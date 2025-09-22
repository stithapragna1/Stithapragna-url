// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getMyUrls, getProfileOfUser } from '../controllers/userController.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/me',authMiddleWare,getProfileOfUser)
userRouter.get('/my/urls',authMiddleWare,getMyUrls);

export default userRouter;
import { Router } from "express";
import {getAllUsers,getOneUser,createUser,deleteUser,getUserAllMsgs} from '../controllers/user.js';
const userRouter = Router();

userRouter.get('/',getAllUsers);
userRouter.get('/:id/messages',getUserAllMsgs);
userRouter.get('/:id',getOneUser);
userRouter.post('/',createUser);
userRouter.delete('/:id',deleteUser);

export default userRouter;
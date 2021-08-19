import { Router } from "express";
import {getAllUsers,getOneUser,createUser,deleteUser,getUserAllMsgs,updateUser} from '../controllers/user.js';
const userRouter = Router();

userRouter.get('/',getAllUsers);
userRouter.get('/:id/messages',getUserAllMsgs);
userRouter.get('/:id',getOneUser);
userRouter.post('/',createUser);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser);

export default userRouter;
import { Router } from "express";
import {getAllMsgs,getOneMsg,createMsg,deleteMsg,updateMsg} from '../controllers/msg.js';
const msgRouter = Router();

msgRouter.get('/',getAllMsgs);
msgRouter.get('/:id',getOneMsg);
msgRouter.post('/',createMsg);
msgRouter.put('/:id',updateMsg);
msgRouter.delete('/:id',deleteMsg);

export default msgRouter;
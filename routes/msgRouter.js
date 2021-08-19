import { Router } from "express";
import {getAllMsgs,getOneMsg,createMsg,deleteMsg} from '../controllers/msg.js';
const msgRouter = Router();

msgRouter.get('/',getAllMsgs);
msgRouter.get('/:id',getOneMsg);
msgRouter.post('/',createMsg);
msgRouter.delete('/:id',deleteMsg);

export default msgRouter;
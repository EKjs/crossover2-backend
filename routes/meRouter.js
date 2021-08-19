import { Router } from "express";
import {getMe} from '../controllers/me.js';
const meRouter = Router();

meRouter.get('/',getMe);

export default meRouter;
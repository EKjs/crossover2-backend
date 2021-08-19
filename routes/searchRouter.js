import { Router } from "express";
import {doSearch} from '../controllers/search.js';
const searchRouter = Router();

searchRouter.get('/',doSearch);

export default searchRouter;
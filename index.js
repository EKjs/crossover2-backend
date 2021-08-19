import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import msgRouter from './routes/msgRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app=express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    const morgan = await import('morgan');
    app.use(morgan.default('dev'));
};

app.use(cors({origin: process.env.CORS_ORIGIN}));

app.use(express.json());
app.use('/messages',msgRouter);
app.use('/users',userRouter);
app.all('*',(req,res)=>res.status(404).json({error:'Not found'}));
app.use(errorHandler);
app.listen(port,()=>console.log(`Server is listening port ${port}`));
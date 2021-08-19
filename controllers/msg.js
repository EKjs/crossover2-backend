import pool from '../db/pg.js';
import validateWithJoi from '../db/schemas.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllMsgs = asyncHandler(async (req,res) => {
    //const { rowCount: total, rows: items } = await pool.query('SELECT * FROM messages;');
    /* res.status(200).json({total,items}); */
    res.status(200).json({
        total:2,
        items: [
    
         {
            id:0,
            title:'first',
            message:'Vestibulum quis felis mi. Pellentesque gravida mauris sit amet urna interdum pretium. Etiam egestas dolor vestibulum libero porttitor, at convallis nunc pretium. Quisque sed gravida odio, id aliquam sem. Aenean quis tortor risus.',
            date:new Date(Date.now()),
            userId:123,
            userName:'Pikachu'
        },
        {
            id:1,
            title:'Second msg',
            message:'Curabitur eros neque, auctor nec eros sed, aliquet rhoncus orci. Ut tortor mauris, tincidunt eget arcu eu, dictum egestas quam. Suspendisse eu pellentesque mauris, ut suscipit velit. Pellentesque semper, nisl at elementum pharetra, dui dui porta nisl, ut suscipit ipsum erat ac odio. Curabitur neque massa, tincidunt ut faucibus sed, ultricies vel ligula. Integer velit massa, gravida a ex ac, fermentum sagittis mi. Fusce dignissim lorem eget massa efficitur, quis vehicula massa cursus. Mauris efficitur mauris et consectetur scelerisque. Vestibulum nec lorem non libero pellentesque scelerisque eget ac nunc. In hac habitasse platea dictumst. Aenean et purus id justo varius molestie. ',
            date:new Date(Date.now()),
            userId:123,
            userName:'Pikachu'
        }
        ],
    })
});


export const getOneMsg = asyncHandler(async (req,res) => {
    //const { id } = req.params;
    res.status(200).json({
        id:0,
        title:'first',
        message:'Vestibulum quis felis mi. Pellentesque gravida mauris sit amet urna interdum pretium. Etiam egestas dolor vestibulum libero porttitor, at convallis nunc pretium. Quisque sed gravida odio, id aliquam sem. Aenean quis tortor risus.',
        date:new Date(Date.now()),
        userId:123,
        userName:'Pikachu'
    })
});

export const createMsg = asyncHandler(async (req,res) => {
    //const {error} = validateWithJoi(req.body,'234');
   // if (error)throw new ErrorResponse(error.details[0].message,400);
    //const { name, description, imgurl, instructions, ingredients } = req.body;
    res.status(201).json({msg:'create ok'})
});

export const deleteMsg = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'delete ok'})
});
import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateWithJoi from '../db/schemas.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req,res) => {
    const { rows: users } = await pool.query('SELECT id,name AS "userName",email FROM users;');
    res.status(200).json(users)
});

export const getUserAllMsgs = asyncHandler(async (req,res) => {
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

export const getOneUser = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400)
    const {rows} = await pool.query('SELECT id, name AS "userName", email FROM users WHERE id=$1;',[id]);
    if (rows.length===0)throw new ErrorResponse('Id not found',404);
    res.status(200).json(rows[0])
});

export const createUser = asyncHandler(async (req,res) => {
    const {error} = validateWithJoi(req.body,'newUser');
    if (error)throw new ErrorResponse(error.details[0].message,400);
    const { userName, email, password, avatar } = req.body;
    const {rows:checkIfExists} = await pool.query('SELECT * FROM users WHERE email=$1;',[email]);
    if (checkIfExists.length>0)throw new ErrorResponse('Email is already taken',400);
    const query = 'INSERT INTO users (name,email,password,avatar) VALUES ($1,$2,$3,$4) RETURNING id, name AS "userName",avatar;';
    const { rows } = await pool.query(query,[userName, email, password, avatar]);
    res.status(201).json(rows[0]);
});

export const deleteUser = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const query='DELETE FROM ONLY users WHERE id=$1 RETURNING id, name AS "userName";';
    const { rows } = await pool.query(query,[id]);
    res.status(200).json(rows[0]);
});
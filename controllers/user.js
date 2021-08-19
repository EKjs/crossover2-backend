import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateWithJoi from '../db/schemas.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req,res) => {
    const { rows: users } = await pool.query('SELECT id,name AS "userName",email, avatar FROM users;');
    res.status(200).json(users)
});

export const getUserAllMsgs = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400)
    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar, email
    FROM messages AS m JOIN users AS u ON m.userid=u.id WHERE userid=$1 ORDER BY m.date DESC;`;
    const { rowCount: total, rows: items } = await pool.query(query,[id]);
    res.status(200).json({total,items});
});

export const getOneUser = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400)
    const {rows} = await pool.query('SELECT id, name AS "userName", email, avatar FROM users WHERE id=$1;',[id]);
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


export const updateUser = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const {error} = validateWithJoi(req.body,'newUser');
    if (error)throw new ErrorResponse(error.details[0].message,400);
    const { userName, email, password, avatar } = req.body;
    const query='UPDATE ONLY users SET name=$2, email=$3, password=$4, avatar=$5 WHERE id=$1 RETURNING id, name AS "userName", email, avatar;';
    const { rows } = await pool.query(query,[id, userName, email, password, avatar]);
    res.status(200).json(rows[0]);
});


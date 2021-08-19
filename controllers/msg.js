import pool from '../db/pg.js';
import validateWithJoi from '../db/schemas.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllMsgs = asyncHandler(async (req,res) => {
    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar
                    FROM messages AS m JOIN users AS u ON m.userid=u.id ORDER BY m.date;`;
    const { rowCount: total, rows: items } = await pool.query(query);
    res.status(200).json({total,items});
});


export const getOneMsg = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar
    FROM messages AS m JOIN users AS u ON m.userid=u.id WHERE m.id=$1;`;
    const {rows} = await pool.query(query,[id]);
    if (rows.length===0)throw new ErrorResponse('Id not found',404);
    res.status(200).json(rows[0])
});

export const createMsg = asyncHandler(async (req,res) => {
    const {error} = validateWithJoi(req.body,'newMsg');
    if (error)throw new ErrorResponse(error.details[0].message,400);
    const { title, date, userId, message } = req.body;
    const query = 'INSERT INTO messages (title,date,userid,message) VALUES ($1,$2,$3,$4) RETURNING id, title, message, date, userid AS "userId";';
    const { rows } = await pool.query(query,[title, date, userId, message]);
    res.status(201).json(rows[0]);
});

export const deleteMsg = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'delete ok'})
});
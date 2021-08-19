import pool from '../db/pg.js';
import validateWithJoi from '../db/schemas.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllMsgs = asyncHandler(async (req,res) => {
    const skip = req.query.skip ? parseInt(req.query.skip,10) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit,10) : 0;
    if (!Number.isInteger(skip))throw new ErrorResponse('Bad skip value',400)
    else if (!Number.isInteger(limit))throw new ErrorResponse('Bad limit value',400);

    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar, email
                    FROM messages AS m JOIN users AS u ON m.userid=u.id ORDER BY m.date DESC;`;
    //const { rowCount: total, rows: items } = await pool.query(query);
    const { rowCount: total, rows: allItems } = await pool.query(query);
    const items = skip===0 && limit===0 ? allItems : limit===0 ? allItems.splice(skip) : allItems.splice(skip,limit);
    res.status(200).json({total,items});
});

export const getOneMsg = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar, email
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
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const query='DELETE FROM ONLY messages WHERE id=$1 RETURNING id, title, message, date, userid AS "userId";';
    const { rows } = await pool.query(query,[id]);
    res.status(200).json(rows[0]);
});

export const updateMsg = asyncHandler(async (req,res) => {
    const id = parseInt(req.params.id,10);
    if (!Number.isInteger(id))throw new ErrorResponse('Bad ID',400);
    const {error} = validateWithJoi(req.body,'newMsg');
    if (error)throw new ErrorResponse(error.details[0].message,400);
    const { title, date, userId, message } = req.body;
    const query='UPDATE ONLY messages SET title=$2, date=$3, userid=$4, message=$5 WHERE id=$1 RETURNING id, title, message, date, userid AS "userId";';
    const { rows } = await pool.query(query,[id, title, date, userId, message]);
    res.status(200).json(rows[0]);
});
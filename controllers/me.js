import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getMe = asyncHandler(async (req,res) => {
    const { rows: users } = await pool.query('SELECT id,name AS "userName",email,avatar FROM users;');
    if (users.length===0)throw new ErrorResponse('No users found',404); //!users doesn't work
    const rand = Math.floor(Math.random()*users.length);
    const randomUser = users[rand];
    res.status(200).json(randomUser)
});
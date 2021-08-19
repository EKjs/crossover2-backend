import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const doSearch = asyncHandler(async (req,res) => {
    const skip = req.query.skip ? parseInt(req.query.skip,10) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit,10) : 0;
    if (!Number.isInteger(skip))throw new ErrorResponse('Bad skip value',400)
    else if (!Number.isInteger(limit))throw new ErrorResponse('Bad limit value',400);

    const searchString = `%${req.query.q}%`;
    const query = `SELECT m.id AS id, title, date, message, userid AS "userId", u.name AS "userName", u.avatar as avatar, email
                    FROM messages AS m JOIN users AS u ON m.userid=u.id
                    WHERE title ILIKE $1 
                    OR message ILIKE $1 
                    OR u.name ILIKE $1 
                    OR email ILIKE $1 
                    ORDER BY m.date DESC;`;
    const { rowCount: total, rows: allItems } = await pool.query(query,[searchString]);
    const items = skip===0 && limit===0 ? allItems : limit===0 ? allItems.splice(skip) : allItems.splice(skip,limit);
    
    res.status(200).json({total,items});
});
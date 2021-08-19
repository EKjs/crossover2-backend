import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllMsgs = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'all msg'})
});


export const getOneMsg = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'one msg'})
});

export const createMsg = asyncHandler(async (req,res) => {
    res.status(201).json({msg:'create ok'})
});

export const deleteMsg = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'delete ok'})
});
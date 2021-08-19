import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'all users'})
});

export const getUserAllMsgs = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'all user msg'})
});

export const getOneUser = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'one user'})
});

export const createUser = asyncHandler(async (req,res) => {
    res.status(201).json({msg:'create ok'})
});

export const deleteUser = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'delete ok'})
});
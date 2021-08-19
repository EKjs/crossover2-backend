import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateWithJoi from '../db/schemas.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req,res) => {
    const users = [
        {
            id:123,
            userName:'Pikachu',
            email:'pika@poke.com',
        },
        {
            id:124,
            userName:'Bulbasaur',
            email:'bulba@poke.com',
        },
        {
            id:125,
            userName:'Ivysaur',
            email:'ivy@poke.com',
        }
        ];
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
    res.status(200).json({
        id:123,
        userName:'Pikachu',
        email:'pika@poke.com',
    })
});

export const createUser = asyncHandler(async (req,res) => {
    res.status(201).json({msg:'create ok'})
});

export const deleteUser = asyncHandler(async (req,res) => {
    res.status(200).json({msg:'delete ok'})
});
import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import connectDB from './models/mongodbconfig.js';
import mongoose from 'mongoose';

//db connection
connectDB();   
//invocking


//server
const port = process.env.PORT||3002;
const server = express();

//middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

//run server
server.listen( port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
});

//run database
mongoose.connection.once('open',()=>{
    console.log(`database is running`);
});
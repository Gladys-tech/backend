import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import connectDB from './models/mongodbconfig.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import itemRoutes from './Routes/item.js';
import userRoutes from './Routes/user.js';

//db connection
connectDB();   
//invocking


//server
const port = process.env.PORT||4000;
const server = express();

// security 
// server.get("/api", (req, res)=>{
//     res.send({
//         message:"hi, welcome to this api",
//     });
// });

// server.post('/api/posts', verifyToken, (req, res)=>{

//     jwt.verify(req.token, 'secretkey', (err, authData) =>{
//         if(err){
//             res.sendStatus(403)
//         }else{
//             res.send({
//                 message:'posts created',
//                 authData
//             });
//         }
//     });
    
// });

// server.post('/api/login', (req, res) =>{
//     const user = {
//         id:1,
//         username:'gladys',
//         email:'gladys@gmail.com'
//     }

//     jwt.sign({user: user}, 'secretkey', (err, token)=>{
//         res.json({
//             token,
//         });
//     });
// });

// function verifyToken(res, req, next){
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearerToken = bearerHeader.split(' ')[1];
//         //const bearerToken = bearerHeader
//         req.token = bearerToken;
//         next()
//     }else{
//         res.sendStatus(403)
//     };
// };


//middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

//USE ROUTES
server.use('/', itemRoutes);
server.use('/', userRoutes);



//run database
mongoose.connection.once('open',()=>{
    console.log(`database is running`);

    //run server
server.listen( port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
});
});
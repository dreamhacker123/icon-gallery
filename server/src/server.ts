import express, { Request, Response } from "express";
import router from "./routers/routes";


import { initDB } from "./config/initDB";

const path=require("path");

require('dotenv').config();


const server = express();

const cors = require('cors');

/**
 * Setup Middlewares
 */
server.use(express.json());

server.use(express.urlencoded({extended:true}));

server.use(cors());

server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

server.get("/healthcheck", (_req: Request, res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now()
    };
    res.status(200).send(healthcheck);
});


server.use(router);


//Intializing Database here
initDB();


export default server;
import 'dotenv/config';

import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from 'express';
import { createServer } from 'node:http';

import { auth } from "./auth.ts";
import './db.ts';
import { chatrouter } from './routes/chat.route.ts';
import { initSocket } from './socket/socket.ts';

const PORT = process.env.PORT || 5000

const app = express()

const server = createServer(app)

// Configure CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE","HEAD"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// For ExpressJS v5 
app.all("/api/auth/*splat", toNodeHandler(auth)); 



// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json())


app.use("/api/chat",chatrouter)

// socket.io server
initSocket(server)

// listen to socket server and http server
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`)
})

export { app };

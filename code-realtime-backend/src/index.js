import * as http from 'http';
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

import userController from "./controller/userController.js";

dotenv.config();

const PORT = process.env.PORT ||3333;

const app = express();

app.use(cors())

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const io = new Server(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
    socket.on("join", ({username, roomId}) => {
        const user = userController.addUser(socket.id, username, roomId);
        if(user) {
            socket.join(user.room);
            const roomMembers = userController.roomMembers(user.room);
            socket.broadcast.to(user.room).emit("joined", username); 
            io.to(user.room).emit("roomMembers", roomMembers);
        }
    });

    socket.on("sendText", ({roomId, text}) => {
         socket.broadcast.to(roomId).emit("getText", text);
    });

    socket.on("disconnect" , () => {
        const user = userController.disconnectUser(socket.id);
        if(user) {
            const roomMembers = userController.roomMembers(user.room);
            io.to(user.room).emit("disconnected", user.username);
            io.to(user.room).emit("roomMembers", roomMembers);
        }
    })

    socket.on("error", (error) => {
        socket.emit("error-text", error)
    })

})


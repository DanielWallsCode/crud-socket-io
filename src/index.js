import app from "./app.js";
import { Server as webSocketServer } from "socket.io";
import http from 'http';
import { connectDB } from "./db.js";
import sockets from "./sockets.js";

connectDB();
const server = http.createServer(app);

const httpServer = server.listen(3000,() => {
    console.log('Servidor corriendo el puerto 3000');
});


const io = new webSocketServer(httpServer);
sockets(io);
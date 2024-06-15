const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const cors = require("cors");

const app = express()
const port = 5000

app.use(cors());

const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

// io.on("connection", (socket) => {
//     console.log('new user connected');
//     socket.on("disconnect", (socket) => {
//         console.log('user disconnected');
//     })

//     socket.send('cricket world cup')

//     socket.on("message", (data) => {
//         console.log(data);
//     })

//     socket.on("testEvent", (data) => {
//         console.log(data);
//     })


//     io.sockets.emit("me", "hello shoun")

// })

let fifa = io.of("/worldCup");
fifa.on("connection", (socket) => {
    fifa.emit("worldCupEvent", "Welcome fifa 2027")
})
let cricket = io.of("/cricketCup");
cricket.on("connection", (socket) => {
    cricket.emit("cricketCupEvent", "Welcome cricket 2026")
})



io.on("connection", (socket) => {

    socket.on("joinRoom", (data) => {
        socket.join(data)
    })

    socket.on("messageEvent", (data) => {
        // socket.broadcast.emit("showMessage", data);
        socket.to(data.room).emit("showMessage", data)
    })
})







app.get('/', (req, res) => {
    res.sendFile(__dirname + "/app.html")
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
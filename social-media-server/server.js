import app from "./app.js"
import http from "http";
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Server } from 'socket.io'
import UserModel from "./models/userModel.js";


dotenv.config({ path: './config.env' })
process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1)
})

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD)

mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
}).then((connections) => {
    console.log(`DB connction completed`)
}).catch((error) => {
    console.log(error)
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`listening on ${port}`)
});

// it will run whenever client connect with server its an event listner
io.on('connection', async (socket) => {
    console.log(socket)
    const user_id = socket.handshake.query["user_id"]
    const socket_id = socket.id;

    console.log(`User connected ${socket_id}`)

    if (user_id) {
        await UserModel.findByIdAndUpdate(user_id, { socket_id })
    }


    // socke event listener at that it handshake
    socket.on("friend_request", async (date) => {
        console.log(data.to)
        // payload from frontend for this perticuler // with friend request we are passing the id of the receiver
        const to = await UserModel.findById(user_id);
        // fiend requesting
        io.to(to.socket_id).emit("new_friend_request",{

        })
    })


})





process.on("unhandledRejection", (error) => {
    console.log(error)
    server.close(() => {
        process.exit(1)
    })
});
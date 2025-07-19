const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config()
const cors = require('cors');
const http = require('http');


app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173", 
    credentials: true
}))

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);








app.use("/", (req, res) => {
    res.send("Welcome to DevConnect API");  
}); 

const server = http.createServer(app);
initializeSocket(server);

connectDB().then(()=>{
    console.log("Database connected successfully");
    server.listen(process.env.PORT, ()=>{
        console.log("Server is running on port 3000");
    });
}).catch((err)=>{
    console.error("Database connection failed:", err);
})

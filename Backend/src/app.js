const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);




app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            res.status(404).send({message: "User not found"});
        } else {
            res.send({message: "User deleted successfully", user});
        }
    }
    catch(err){
        res.status(500).send({message: "Error deleting user", error: err.message});
    }
})



app.use("/", (req, res) => {
    res.send("Welcome to DevConnect API");  
}); 

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    });
}).catch((err)=>{
    console.error("Database connection failed:", err);
})

const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser())

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);





app.get("/user", async (req, res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
             res.status(404).send({message: "No users found with this email"});
        }else {
            res.send(user);
        }
    }
    catch(err){
        res.status(500).send({message: "Error fetching users", error: err.message});
    }
});

app.get("/feed", async(req, res)=>{
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send({message: "No users found"});
        } else {
            res.send(users);
        }
    }
    catch(err){
        res.status(500).send({message: "Error fetching feed", error: err.message});
    } 
})

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

app.patch("/user/:userId", async(req, res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES =["firstName", "lastName","about", "age","gender", "photoUrl"];
        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            return res.status(400).send({message: "Invalid updates"});
        }
        if(data?.skills.length>10){
            return res.status(400).send({message: "Skills cannot exceed 10 items"});
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true
        });
        res.send({message: "User updated successfully"});
    }
    catch(err){
        res.status(500).send({message: "Error updating user", error: err.message});
    }
});

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

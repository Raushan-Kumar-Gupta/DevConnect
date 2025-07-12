const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user'); // Import the User model
app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send({message: "User created successfully", user});
    }
    catch(err){
        res.status(400).send({message: "Error creating user", error: err.message});
    }
});

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

const express = require('express');
const connectDB = require('./config/database');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Import the User model
const { validateSignUpData } = require('./utils/validation'); // Import validation function
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
    try{
        validateSignUpData(req); // Validate signup data
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName, 
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.status(201).send({message: "User created successfully", user});
    }
    catch(err){
        res.status(400).send({message: "Error creating user", error: err.message});
    }
});

app.post("/login", async (req, res)=>{
    const {emailId, password}= req.body;
    try{
        const user = await User.findOne({emailId});
        if(!user || user.length === 0){
            return res.status(404).send({message: "User not found"});
        }
        const isPasswordValid = await user.validatePassword(password);
        
        if(!isPasswordValid){
            return res.status(401).send({message: "Invalid credentials"});
        }
        else{
            const token = jwt.sign({_id:user._id}, "DevConnect@123", {expiresIn: '1h'});
            res.cookie("token", token);
            res.send({message: "Login successful", user});
        }
    }
    catch(err){
        res.status(400).send({message: "Error logging in", error: err.message});
    }
})

app.get("/profile", userAuth, async(req, res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send({message: "Error fetching profile", error: err.message});
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

})

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

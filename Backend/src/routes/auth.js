const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const authRouter = express.Router();
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


authRouter.post("/signup", async (req, res) => {
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
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token);
        res.json({message: "User created successfully", savedUser});
    }
    catch(err){
        res.status(400).send({message: "Error creating user", error: err.message});
    }
});

authRouter.post("/login", async (req, res)=>{
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
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send({message: "Login successful", user});
        }
    }
    catch(err){
        res.status(400).send({message: "Error logging in", error: err.message});
    }
})

authRouter.post("/logout", (req, res)=>{
    try{
        res.clearCookie("token");
        res.send({message: "Logged out successfully"});
    }
    catch(err){
        res.status(400).send({message: "Error logging out", error: err.message});
    }
});

module.exports = authRouter;
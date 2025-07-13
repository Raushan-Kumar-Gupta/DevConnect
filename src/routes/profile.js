const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async(req, res)=>{
    try{
        const user = req.user;
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send({message: "Error fetching profile", error: err.message});
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid profile data");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName}, Profile updated successfully`, user: loggedInUser});
    }
    catch(err){
        res.status(400).send({message: "Error updating profile", error: err.message});
    }
});

module.exports = profileRouter;
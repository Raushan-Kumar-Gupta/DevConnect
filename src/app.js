const express = require('express')

const app = express();

const connectDb = require('./config/database');

const User = require('./models/user');

app.use(express.json())

app.get('/user', async(req, res)=>{
    const useremailId=req.body.emailId;
    const users=await User.find({emailId:useremailId})
    try{
        if(users.length===0){
            res.send("match not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(404).send("somethings went wrong")
    }

})

app.delete('/user', async(req, res)=>{
    const useremailId=req.body._id;
    try{
        const users=await User.findByIdAndDelete({_id:useremailId})
        res.send("user deleted sucessfully");
    }
    catch(err){
        res.status(404).send("somethings went wrong")
    }

})

app.get('/feed', async(req, res)=>{
    const useremailId=req.body.emailId;
    const users=await User.find({})
    try{
            res.send(users);
    }
    catch(err){
        res.status(404).send("somethings went wrong")
    }

})

app.post('/signUp', async(req, res)=>{
    // const user = new User({
    //     firstName:"Sahil", 
    //     lastName:"gupta", 
    //     emailId:"sahil@gmail.com", 
    //     password:"sahil123",
    // })

        const user = new User(req.body)

   try{ 
    await user.save();
    res.send("user data saved succesfully");
    }
    catch(err){
        res.status(400).send("failed to add user");
    }
})

connectDb()
  .then(() => {
    console.log("connected to database");
    app.listen(7878, ()=>{
        console.log("server is listening...dfasdf")
    })
  })
  .catch((err) => {
    console.log("Not connected to database");
  });



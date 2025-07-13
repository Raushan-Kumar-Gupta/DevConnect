const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://raushang714:IsEjZHLNe4yNG8I3@gutennodejs.kfndy.mongodb.net/DevConnect");
}

module.exports = connectDB;
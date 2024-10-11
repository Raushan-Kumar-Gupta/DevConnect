const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://raushang714:IsEjZHLNe4yNG8I3@gutennodejs.kfndy.mongodb.net/devTinder"
  );
};

module.exports=connectDb
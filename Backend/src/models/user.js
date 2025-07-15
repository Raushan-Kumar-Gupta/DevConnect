const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
 {
    firstName: {
        type: String,
        required: true, 
        minlength: 4,
        maxlength: 20,
        trim: true,
    },
    lastName: {
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong");
            }
        }
    },
    age:{
        type: Number,
        min: 5,
        max: 100,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT =async function(){
    const user = this;
    const token =await jwt.sign({_id: user._id}, "DevConnect@123", {
        expiresIn: '1d'})
        return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid credentials");
    }
    return isPasswordValid;
}
module.exports = mongoose.model('User', userSchema);
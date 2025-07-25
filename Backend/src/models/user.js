const mongoose = require("mongoose");
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
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must be strong");
        }
      },
      required: true,
    },
    age: {
      type: Number,
      min: 5,
      max: 100,
      required: true,
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
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        // Accept HTTP/HTTPS URLs or data URLs (base64 images)
        if (
          !validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,
          }) &&
          !/^data:image\/[a-zA-Z]+;base64,/.test(value)
        ) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
      required: true,
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DevConnect@123", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);

const  jwt  = require("jsonwebtoken");
const User = require("../models/user"); // Import the User model
const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const decodedObj = jwt.verify(token, "DevConnect@123");
        const user = await User.findById(decodedObj._id);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send({ message: "Invalid token", error: err.message });
    }
}

module.exports = {userAuth};
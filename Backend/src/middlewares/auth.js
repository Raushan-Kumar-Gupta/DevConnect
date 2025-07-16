const  jwt  = require("jsonwebtoken");
const User = require("../models/user"); // Import the User model
const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).send("Unauthorized");
        }
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedObj._id);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ message: "Invalid token", error: err.message });
    }
}

module.exports = {userAuth};
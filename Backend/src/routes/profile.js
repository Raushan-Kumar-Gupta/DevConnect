const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      if (key === "skills") {
        const val = req.body[key];
        loggedInUser.skills =
          typeof val === "string"
            ? val.split(",").map((s) => s.trim())
            : Array.isArray(val)
            ? val
            : [];
      } else {
        loggedInUser[key] = req.body[key];
      }
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.delete("/profile/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.send({ message: "User deleted successfully", user });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting user", error: err.message });
  }
});
module.exports = profileRouter;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = async (req, res) => {
  const { userName, password } = req.body.user;

  // check if email exists in DB!
  const dbUser = await User.findOne({ userName: userName }).exec();
  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, userName: dbUser.userName },
        "Lakshy",
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
    }
  } else {
    res.status(400).json({ message: "Username or Password incorrect" });
  }
};
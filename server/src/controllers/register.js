const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const User = require("../models/user");

const saltRounds = 10;

const validateSignupData = async (req, res) => {
  const { userName, email, password } = req.body.user;
  console.log(userName);

  if (userName.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a userName" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please Enter password" });
    return false;
  } else if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length is 6 characters" });
    return false;
  }

  // check if email exists in DB!
  const existingUser = await User.findOne({ email: email }).exec();
  if (existingUser) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  const { userName, email, password } = req.body.user;
  console.log(userName, email, password);

  // Validate Inputs
  const isValid = await validateSignupData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ userName, email, password: hashedPassword });

      return res.json({
        message: "Account Created Successfully",
        user: { _id: user._id, userName: user.userName, email: user.email },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  }
};
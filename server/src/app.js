const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const Todos = require("./models/models");
const User = require("./models/user");

// Adding todo items
app.post("/add", (req, res) => {
  const taskDetails = req.body.taskDetails;
  Todos.create({
    taskDetails: taskDetails,
  })
    .then(console.log("Data added"))
    .catch((err) => console.log(err));
});

//accessing todo item
app.get("/getToDodata", async (req, res) => {
  try {
    const data = await Todos.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

//updating todo item
app.put("/updateToDodata/:id", (req, res) => {
  const { id } = req.params;
  Todos.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

// deleting todo item
app.delete("/deleteToDodata/:id", (req, res) => {
  const { id } = req.params;
  Todos.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

// User registration
app.post("/user/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body.user;
    const existingUser = await User.findOne({ userName, email });

    // checking all fields
    console.log(userName);
    if (!(userName || email || password)) {
      res.status(400).json({ message: "All fields are mendatory!" });
      console.log("All fields are mendatory");
    } else if (existingUser) {
      res.status(400).json({ msg: "User already exist" });
      console.log("User already exist!");
    }

    //password encryption

    const encryptedPassword = await bcrypt.hash(password, 10);

    //Creating user in dataBase
    const user = await User.create({
      userName: userName,
      email: email,
      password: encryptedPassword,
    });

    //Creating token

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
      },
      "lakshy", //shh key
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// User authentication and login api
app.post("/user/login", async (req, res) => {
  //checking all the fields
  const { userName, password } = req.body.user;
  //If user does not exist
  if (!(userName || password)) {
    //   res.status(400).send("All fields are mendetory");
    console.log("All fields are mendatory");
    console.log(userName);
  }
  //find user in Db
  const user = await User.findOne({ userName });

  // password matching
  const passwordCheck = bcrypt.compare(password, user.password);

  if (user && passwordCheck) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      "lakshy", //shh key
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    user.password = undefined;
    //cookie section
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "login successfully",
    });
  }
});

//server running message
app.get("/", (req, res) => {
  res.status(200).json({ msg: "connected" });
});

module.exports = app;

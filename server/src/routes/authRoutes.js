const { Router } = require("express");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const register = require("../controllers/register");
const {
  addToDoData,
  getToDoData,
  updateToDoData,
  deleteToDoData,
} = require("../controllers/toDo");

const router = Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/auth", auth);
router.post("/add", addToDoData);
router.get("/getToDodata", getToDoData);
router.put("/updateToDodata/:id", updateToDoData);
router.delete("/deleteToDodata/:id", deleteToDoData);

module.exports = router;

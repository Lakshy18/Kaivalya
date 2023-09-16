// // Adding todo items
// app.post("/add", (req, res) => {
//   const taskDetails = req.body.taskDetails;
//   Todos.create({
//     taskDetails: taskDetails,
//   })
//     .then(console.log("Data added"))
//     .catch((err) => console.log(err));
// });

// //accessing todo item
// app.get("/getToDodata", async (req, res) => {
//   try {
//     const data = await Todos.find();
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //updating todo item
// app.put("/updateToDodata/:id", (req, res) => {
//   const { id } = req.params;
//   Todos.findByIdAndUpdate({ _id: id }, { done: true })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => console.log(err));
// });

// // deleting todo item
// app.delete("/deleteToDodata/:id", (req, res) => {
//   const { id } = req.params;
//   Todos.findByIdAndDelete({ _id: id })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => console.log(err));
// });
const Todos = require("../models/toDoItems");
exports.addToDoData = async (req, res) => {
  const taskDetails = req.body.taskDetails;
  try {
    if (taskDetails.trim().length === 0) {
      res.status(400).json({ message: "Please Enter a valid To Do Item" });
      return false;
    } else {
      await Todos.create({
        taskDetails: taskDetails,
      });
      res.status(200).json({ message: "Item entered Successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "data can't be added" });
  }
};

exports.getToDoData = async (req, res) => {
  try {
    const data = await Todos.find().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ error: "data can not be get" });
  }
};
exports.updateToDoData = async (req, res) => {
    const { id } =await req.params;
  try {
    const update = await Todos.findByIdAndUpdate({ _id: id }, { done: true });
    res.status(200).send(update);
  } catch (error) {
    res.status(400).json({ error: "data can not be updated" });
  }
};
exports.deleteToDoData = async (req, res) => {
    const { id } = await req.params;
  try {
    const update =await  Todos.findByIdAndDelete({ _id: id }, { done: true });
    res.status(200).send(update);
  } catch (error) {
    res.status(400).json({ error: "data can not be deleted" });
  }
};

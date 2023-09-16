// const app = require("./src/app");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./src/routes/authRoutes");
// Parse JSON bodies (as sent by API clients)
mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
const port = 3001;
const dbURL =
  "mongodb+srv://ForKaivalya:L4vNJXJEe8onkMrs@cluster0.psxmspv.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1:27017/testing";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to Database");
    // server listening
  })
  .catch((err) => {
    console.log(err);
  });
  app.use("/", routes);
  app.listen(port, () => console.log(`App listening on port ${port}!`));
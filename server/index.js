const app = require("./src/app");
const mongoose = require("mongoose");

// Parse JSON bodies (as sent by API clients)
mongoose.set("strictQuery", false);

const port = 3001;
const dbURL =
  "mongodb+srv://ForKaivalya:L4vNJXJEe8onkMrs@cluster0.psxmspv.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1:27017/testing";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to Database");
    // server listening
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });

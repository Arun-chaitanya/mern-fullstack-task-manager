const connectDb = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json()); //it converts the incoming request body to object

//routes

app.use("/api/v1/tasks", tasks);

app.use(errorHandlerMiddleware);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

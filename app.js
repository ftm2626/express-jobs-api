require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const AuthRouter = require("./routes/auth");
const JobRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authMiddleware } = require("./middleware/authentication");

//connect DB
const connectDB = require("./db/connect");
app.use(express.json());

// routers

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", authMiddleware, JobRouter);

// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

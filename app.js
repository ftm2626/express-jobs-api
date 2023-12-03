require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const app = express();
const AuthRouter = require("./routes/auth");
const JobRouter = require("./routes/jobs");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authMiddleware } = require("./middleware/authentication");
const connectDB = require("./db/connect");

app.set('trust proxy',1) //upload to heroku
//extra security packages
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each ip to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//connect DB
app.use(express.json());

// routers
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", authMiddleware, JobRouter);

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});
// error handler
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

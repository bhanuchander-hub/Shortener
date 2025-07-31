const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loggingMiddleware, logger } = require("./middleware/logger");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(loggingMiddleware);

mongoose.connect("mongodb+srv://bhanuchander:<db_password>@cluster0.w7qrxbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error:", err));

app.use("/", urlRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

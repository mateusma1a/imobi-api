// Setting the routes
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const buildingRoutes = require("./routes/buildingRoutes");

// Setting the constants
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Configuring cors settings
const corsOptions = {
  origin: "*",
  exposedHeaders: "X-Total-Count",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Imobi-api initial route." });
});

// Region routes
app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/building", buildingRoutes);
// End region routes

module.exports = app;

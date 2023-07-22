const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const UserController = require("../controllers/UserController");

appRoutes.use(bodyParser.json());

//Routes
appRoutes.post("/create", UserController.addUser);
appRoutes.delete("/delete", UserController.deleteUser);
//End routes

module.exports = appRoutes;

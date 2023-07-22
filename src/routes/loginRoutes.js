const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const LoginController = require("../controllers/LoginController");

appRoutes.use(bodyParser.json());

//Routes
appRoutes.post("/auth", LoginController.login);
//End routes

module.exports = appRoutes;

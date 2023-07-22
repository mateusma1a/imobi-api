const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const BuildingController = require("../controllers/BuildingController");

appRoutes.use(bodyParser.json());

//Routes
appRoutes.post("/create", BuildingController.addBuilding);
appRoutes.delete("/delete", BuildingController.deleteBuilding);
appRoutes.get("/get-all-buildings", BuildingController.getAllBuildings);
//End routes

module.exports = appRoutes;

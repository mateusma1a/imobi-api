const express = require("express");
const appRoutes = express.Router();
const bodyParser = require("body-parser");
const CompanyController = require("../controllers/CompanyController");

appRoutes.use(bodyParser.json());

//Routes
appRoutes.post("/create", CompanyController.addCompany);
appRoutes.delete("/delete", CompanyController.deleteCompany);
appRoutes.get("/get-all-companies", CompanyController.getAllCompanies);
//End routes

module.exports = appRoutes;

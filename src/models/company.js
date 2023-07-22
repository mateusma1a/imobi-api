const imobidb = require("../config/imobidb");
const { ERROR_ADD_COMPANY, ERROR_DELETE_COMPANY, ERROR_GET_ALL_COMPANIES } = require("../includes/Constants");

/**
 * Register a new company in the system.
 * @param {*} companyData 
 * @returns companyId
 */
const createCompany = async (companyData) => {
  try {
    const [companyId] = await imobidb.knex("company").insert(companyData);
    return companyId;
  } catch (error) {
    throw new Error(`${ERROR_ADD_COMPANY}: ` + error.message);
  }
};

/**
 * Delete company by companyId.
 * @param {*} companyId 
 * @returns result with the number of rows affected.
 */
const deleteCompany = async (companyId) => {
  try {
    const result = await imobidb.knex("company").where('id', companyId).delete();
    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_COMPANY}: ` + error.message);
  }
};

/**
 * Get all companies.
 * @returns All the companies in the company table.
 */
const getAllCompanies = async () => {
  try {
    const result = await imobidb.knex.select("*").from("company");
    return result;
  } catch (error) {
    throw new Error(`${ERROR_GET_ALL_COMPANIES}: ` + error.message);
  }
};

module.exports = { createCompany, deleteCompany, getAllCompanies };

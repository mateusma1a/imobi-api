const Company = require("../models/company");
const { ERROR_CREATING_COMPANY, ERROR_DELETE_COMPANY, ERROR_GET_ALL_COMPANIES } = require("../includes/Constants");

/**
 * Calls the Company model to create a new company.
 * @param {*} companyData 
 * @returns companyId
 */
exports.createCompany = async (companyData) => {
  try {
    const companyId = await Company.createCompany(companyData);

    return companyId;
  } catch (error) {
    throw new Error(`${ERROR_CREATING_COMPANY}: ` + error.message);
  }
};


/**
 * Delete a company by companyId.
 * @param {*} companyId 
 * @returns result of the number of rows affected.
 */
exports.deleteCompany = async (companyId) => {
  try {
    const result = await Company.deleteCompany(companyId);

    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_COMPANY}: ` + error.message);
  }
};

/**
 * Get all companies.
 * @returns All the companies in the company table.
 */
exports.getAllCompanies = async () => {
  try {
    const result = await Company.getAllCompanies();

    return result;
  } catch (error) {
    throw new Error(`${ERROR_GET_ALL_COMPANIES}: ` + error.message);
  }
};

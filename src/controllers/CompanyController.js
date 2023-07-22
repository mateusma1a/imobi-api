const companyService = require("../services/companyService");
const {
  SUCCESS_ADD_COMPANY,
  SUCCESS_DELETE_COMPANY,
  ERROR_ADD_COMPANY,
  ERROR_DELETE_COMPANY,
  NOT_FOUND_COMPANY,
  NOT_FOUND_ANY_COMPANY,
  ERROR_GET_ALL_COMPANIES,
  SUCCESS_GET_ALL_COMPANIES
} = require("../includes/Constants");

class CompanyController {
  /**
   * Method to add a company
   * @param {*} req
   * @param {*} res
   */
  static addCompany = async (req, res) => {
    try {
      const { id, company_type_id, company_name, main_address, telephone, email } = req.body;

      let companyData;
      
      if(id) {
        companyData = {
          id,
          company_type_id,
          company_name,
          main_address,
          telephone,
          email,
        };
      } else {
        companyData = {
          company_type_id,
          company_name,
          main_address,
          telephone,
          email,
        };
      }

      const companyId = await companyService.createCompany(companyData);

      res.status(201).json({
        success: true,
        message: SUCCESS_ADD_COMPANY,
        companyId,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_ADD_COMPANY,
        error: error.message,
      });
    }
  };

  /**
   * Method to delete a company
   * @param {*} req 
   * @param {*} res 
   */
  static deleteCompany = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await companyService.deleteCompany(id);

      if(result > 0) {
        res.status(201).json({
          success: true,
          message: SUCCESS_DELETE_COMPANY,
          result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: NOT_FOUND_COMPANY,
          result,
        });
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_DELETE_COMPANY,
        error: error.message,
      });
    }
  };

  /**
   * Method to get all companies.
   * @param {*} req 
   * @param {*} res 
   */
  static getAllCompanies = async (req, res) => {
    try {
      const result = await companyService.getAllCompanies();

      if(result.length > 0) {
        res.status(201).json({
          success: true,
          message: SUCCESS_GET_ALL_COMPANIES,
          result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: NOT_FOUND_ANY_COMPANY,
          result,
        });
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_GET_ALL_COMPANIES,
        error: error.message,
      });
    }
  };
}

module.exports = CompanyController;

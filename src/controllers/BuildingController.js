const buildingService = require("../services/buildingService");
const {
  SUCCESS_ADD_BUILDING,
  SUCCESS_DELETE_BUILDING,
  ERROR_ADD_BUILDING,
  ERROR_DELETE_BUILDING,
  NOT_FOUND_BUILDING,
  NOT_FOUND_ANY_BUILDING,
  ERROR_GET_ALL_BUILDINGS,
  SUCCESS_GET_ALL_BUILDINGS,
} = require("../includes/Constants");

class buildingController {
  /**
   * Method to add a building
   * @param {*} req
   * @param {*} res
   */
  static addBuilding = async (req, res) => {
    try {
      const {
        id,
        registration,
        state,
        city,
        neighborhood,
        street,
        numberAddress,
        address,
        latitude,
        longitude,
        building_type_id,
        evaluation_report_value,
        acquisition_value,
        rent_value,
        sale_value,
        registered_user_id,
        registered_date_time,
        clients_id,
        company_id,
        building_status_type_id,
      } = req.body;

      let buildingData;

      if (id) {
        buildingData = {
          id,
          registration,
          state,
          city,
          neighborhood,
          street,
          numberAddress,
          address,
          latitude,
          longitude,
          building_type_id,
          evaluation_report_value,
          acquisition_value,
          rent_value,
          sale_value,
          registered_user_id,
          registered_date_time,
          clients_id,
          company_id,
          building_status_type_id,
        };
      } else {
        buildingData = {
          registration,
          state,
          city,
          neighborhood,
          street,
          numberAddress,
          address,
          latitude,
          longitude,
          building_type_id,
          evaluation_report_value,
          acquisition_value,
          rent_value,
          sale_value,
          registered_user_id,
          registered_date_time,
          clients_id,
          company_id,
          building_status_type_id,
        };
      }

      const buildingId = await buildingService.createBuilding(buildingData);

      res.status(201).json({
        success: true,
        message: SUCCESS_ADD_BUILDING,
        buildingId,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_ADD_BUILDING,
        error: error.message,
      });
    }
  };

  /**
   * Method to delete a building
   * @param {*} req
   * @param {*} res
   */
  static deleteBuilding = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await buildingService.deleteBuilding(id);

      if (result > 0) {
        res.status(201).json({
          success: true,
          message: SUCCESS_DELETE_BUILDING,
          result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: NOT_FOUND_BUILDING,
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_DELETE_BUILDING,
        error: error.message,
      });
    }
  };

  /**
   * Method to get all buildings.
   * @param {*} req
   * @param {*} res
   */
  static getAllBuildings = async (req, res) => {
    try {
      const result = await buildingService.getAllBuildings();

      if (result.length > 0) {
        res.status(201).json({
          success: true,
          message: SUCCESS_GET_ALL_BUILDINGS,
          result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: NOT_FOUND_ANY_BUILDING,
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_GET_ALL_BUILDINGS,
        error: error.message,
      });
    }
  };
}

module.exports = buildingController;

const Building = require("../models/building");
const { ERROR_CREATING_BUILDING, ERROR_DELETE_BUILDING, ERROR_GET_ALL_BUILDINGS } = require("../includes/Constants");

/**
 * Calls the building model to create a new building.
 * @param {*} buildingData 
 * @returns buildingId
 */
exports.createBuilding = async (buildingData) => {
  try {
    const buildingId = await Building.createBuilding(buildingData);

    return buildingId;
  } catch (error) {
    throw new Error(`${ERROR_CREATING_BUILDING}: ` + error.message);
  }
};


/**
 * Delete a building by buildingId.
 * @param {*} buildingId 
 * @returns result of the number of rows affected.
 */
exports.deleteBuilding = async (buildingId) => {
  try {
    const result = await Building.deleteBuilding(buildingId);

    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_BUILDING}: ` + error.message);
  }
};

/**
 * Get all buildings.
 * @returns All the buildings in the building table.
 */
exports.getAllBuildings = async () => {
  try {
    const result = await Building.getAllBuildings();

    return result;
  } catch (error) {
    throw new Error(`${ERROR_GET_ALL_BUILDINGS}: ` + error.message);
  }
};

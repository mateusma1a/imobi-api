const imobidb = require("../config/imobidb");
const { ERROR_ADD_BUILDING, ERROR_DELETE_BUILDING, ERROR_GET_ALL_BUILDINGS } = require("../includes/Constants");

/**
 * Register a new building in the system.
 * @param {*} buildingData 
 * @returns buildingId
 */
const createBuilding = async (buildingData) => {
  try {
    const [buildingId] = await imobidb.knex("building").insert(buildingData);
    return buildingId;
  } catch (error) {
    throw new Error(`${ERROR_ADD_BUILDING}: ` + error.message);
  }
};

/**
 * Delete building by buildingId.
 * @param {*} buildingId 
 * @returns result with the number of rows affected.
 */
const deleteBuilding = async (buildingId) => {
  try {
    const result = await imobidb.knex("building").where('id', buildingId).delete();
    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_BUILDING}: ` + error.message);
  }
};

/**
 * Get all buildings.
 * @returns All the buildings in the building table.
 */
const getAllBuildings = async () => {
  try {
    const result = await imobidb.knex.select("*").from("building");
    return result;
  } catch (error) {
    throw new Error(`${ERROR_GET_ALL_BUILDINGS}: ` + error.message);
  }
};

module.exports = { createBuilding, deleteBuilding, getAllBuildings };

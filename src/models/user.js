const imobidb = require("../config/imobidb");
const { ERROR_ADD_USER, ERROR_DELETE_USER } = require("../includes/Constants");

/**
 * Create a new user in the system.
 * @param {*} userData 
 * @returns userId
 */
const createUser = async (userData) => {
  try {
    const [userId] = await imobidb.knex("users").insert(userData);
    return userId;
  } catch (error) {
    throw new Error(`${ERROR_ADD_USER}: ` + error.message);
  }
};

/**
 * Delete user by userId.
 * @param {*} userId 
 * @returns result with the number of rows affected.
 */
const deleteUser = async (userId) => {
  try {
    const result = await imobidb.knex("users").where('id', userId).delete();
    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_USER}: ` + error.message);
  }
};

module.exports = { createUser, deleteUser };

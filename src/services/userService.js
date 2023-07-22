const User = require("../models/user");
const { ERROR_CREATING_USER, ERROR_DELETE_USER } = require("../includes/Constants");

/**
 * Calls the user model to create a new user.
 * @param {*} userData 
 * @returns userId
 */
exports.createUser = async (userData) => {
  try {
    const userId = await User.createUser(userData);

    return userId;
  } catch (error) {
    throw new Error(`${ERROR_CREATING_USER}: ` + error.message);
  }
};

/**
 * Delete a user by userId.
 * @param {*} userId 
 * @returns result of the number of rows affected.
 */
exports.deleteUser = async (userId) => {
  try {
    const result = await User.deleteUser(userId);

    return result;
  } catch (error) {
    throw new Error(`${ERROR_DELETE_USER}: ` + error.message);
  }
};
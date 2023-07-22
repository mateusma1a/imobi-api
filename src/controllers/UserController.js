const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const {
  SUCCESS_ADD_USER,
  SUCCESS_DELETE_USER,
  ERROR_ADD_USER,
  ERROR_DELETE_USER,
  NOT_FOUND_USER,
} = require("../includes/Constants");

class UserController {
  static addUser = async (req, res) => {
    try {
      let {
        id,
        full_name,
        user_login,
        user_password,
        nickname,
        telephone,
        email,
        company_id,
      } = req.body;

      user_password = bcrypt.hashSync(user_password, 8);
      let userData;

      if (id) {
        userData = {
          id,
          full_name,
          user_login,
          user_password,
          nickname,
          telephone,
          email,
          company_id,
        }

      } else {
        userData = {
          full_name,
          user_login,
          user_password,
          nickname,
          telephone,
          email,
          company_id,
        }
      }

      const userId = await userService.createUser(userData);

      res.status(201).json({
        success: true,
        message: SUCCESS_ADD_USER,
        userId,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_ADD_USER,
        error: error.message,
      });
    }
  };

  /**
   * Method to delete a user
   * @param {*} req
   * @param {*} res
   */
  static deleteUser = async (req, res) => {
    try {
      const { id } = req.body;

      const result = await userService.deleteUser(id);

      if (result > 0) {
        res.status(201).json({
          success: true,
          message: SUCCESS_DELETE_USER,
          result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: NOT_FOUND_USER,
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: ERROR_DELETE_USER,
        error: error.message,
      });
    }
  };
}

module.exports = UserController;

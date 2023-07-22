// Get the environment variable
require("dotenv").config();

// Defining constants
const imobidb = require("../config/imobidb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  SUCCESS_LOGGED,
  INCORRECT_CREDENTIALS,
  ERROR_VERIFYING_CREDENTIALS,
} = require("../includes/Constants");

/**
 * @class LoginController
 * This class is responsable to authenticate the user and generate the jwt token
 */
class LoginController {
  static login = async (req, res) => {
    try {
      const results = await imobidb.knex
        .select('*')
        .from('users')
        .where({ user_login: req.body.userLogin });

      if (results.length) {
        let user = results[0];
        let checkPassword = await bcrypt.compare(
          req.body.userPassword,
          user.user_password
        );
        if (checkPassword) {
          var tokenJWT = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 600000,
          });
          res.status(200).json({
            success: true,
            message: SUCCESS_LOGGED,
            id: user.id,
            fullName: user.full_name,
            userLogin: user.user_login,
            nickname: user.nickname,
            telephone: user.telephone,
            email: user.email,
            companyId: user.company_id,
            token: tokenJWT,
          });
        } else {
          res.status(401).json({
            success: false,
            message: INCORRECT_CREDENTIALS,
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: INCORRECT_CREDENTIALS,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: ERROR_VERIFYING_CREDENTIALS + " - " + err.message,
      });
    }
  };
}

module.exports = LoginController;

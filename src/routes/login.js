import pgFormat from "pg-format";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dbMan from "../database/manager.js";
const query = dbMan.query;

import asyncLoader from "../middleware/asyncMiddleware.js";

import { envConfig } from "../utils/envUtils.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const getUserByEmailQuery = pgFormat(
      `SELECT * FROM ${envConfig.dbtable} WHERE email = %L;`,
      email
    );

    const result = await query(getUserByEmailQuery);
    if (result.rows.length === 0) {
      res.status(400).json({
        error: "El email ingresado no existe.",
      });

      return;
    }

    const encryptedPass = result.rows[0].password;
    const match = bcrypt.compareSync(password, encryptedPass);

    if (!match) {
      res.status(400).json({
        error: "Contraseña incorrecta.",
      });

      return;
    }

    const token = jwt.sign({ email }, envConfig.jwtSecret, {
      expiresIn: 60 * 1, // 1 minute
    });

    res.status(200).send(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export default {
  loginUser: asyncLoader(loginUser),
};

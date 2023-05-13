import pgFormat from "pg-format";
import bcrypt from "bcryptjs";

import dbMan from "../database/manager.js";
const query = dbMan.query;

import asyncLoader from "../middleware/asyncMiddleware.js";

import { envConfig } from "../utils/envUtils.js";

const createUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    const checkExistingQuery = pgFormat(
      `SELECT * FROM ${envConfig.dbtable} WHERE email = %L;`,
      email
    );

    const result = await query(checkExistingQuery);
    if (result.rows.length > 0) {
      res.status(400).json({
        error: "El email ingresado ya existe.",
      });

      return;
    }

    const salt = bcrypt.genSaltSync(envConfig.saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const createUserQuery = pgFormat(
      `INSERT INTO ${envConfig.dbtable} (email, password, rol, lenguage) VALUES (%L, %L, %L, %L);`,
      email,
      hash,
      rol,
      lenguage
    );

    const createResult = await query(createUserQuery);
    if (createResult.rowCount === 0) {
      throw new Error("Error al crear usuario.");
    }

    res.status(201).json({
      message: "Usuario creado correctamente.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al crear usuario.",
    });
  }
};

const getUserSelf = async (req, res) => {
  try {
    const { email } = req.tokenPayload;

    const getUserByEmailQuery = pgFormat(
      `SELECT * FROM ${envConfig.dbtable} WHERE email = %L;`,
      email
    );

    const result = await query(getUserByEmailQuery);
    if (result.rows.length === 0) {
      res.status(500).json({
        error: "No pudimos encontrar su perfil!",
      });

      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al obtener usuario.",
    });
  }
};

const test_getUsers = async (req, res) => {
  try {
    const result = await query(`SELECT * FROM ${envConfig.dbtable};`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al obtener usuarios.",
    });
  }
};

export default {
  createUser: asyncLoader(createUser),
  getUserSelf: asyncLoader(getUserSelf),
  test_getUsers: asyncLoader(test_getUsers),
};

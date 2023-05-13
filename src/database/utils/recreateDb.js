import pg from "pg";
const { Pool } = pg;

import { dbConfig } from "../../utils/envUtils.js";

const recreateDb = async (pool) => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${dbConfig.dbname};`);
    await pool.query(`CREATE DATABASE ${dbConfig.dbname};`);

    const dbPool = new Pool(dbConfig);
    await dbPool.query(
      `CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );`
    );

    console.log("Database recreated");
  } catch (err) {
    console.error("Could not recreate database");
    console.error(err);
    process.exit(1);
  }
};

export default recreateDb;

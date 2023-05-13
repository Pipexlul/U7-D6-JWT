import pg from "pg";
const { Pool } = pg;

import recreateDb from "./utils/recreateDb.js";
import { dbConfig, options } from "../../utils/envUtils.js";

class Manager {
  static async query(queryStr, params) {
    await Manager.#initConnection();

    return await Manager.#_dbPool.query(queryStr, params);
  }

  static async #initConnection() {
    if (!Manager.#_didInit) {
      if (!options || !options.skip) {
        const rootPool = new Pool({ ...dbConfig, database: "postgres" });
        try {
          Manager.#_dbPool = await recreateDb(rootPool);
        } catch (err) {
          console.error("Could not recreate database");
          console.error(err);
          process.exit(1);
        } finally {
          Promise.resolve(rootPool.end());
        }
      } else {
        Manager.#_dbPool = new Pool(dbConfig);
      }

      Manager.#_didInit = true;
    }
  }

  static #_didInit = false;
  static #_dbPool = null;
}

export default Manager;

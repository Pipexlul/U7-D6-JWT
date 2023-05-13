import * as dotenv from "dotenv";
dotenv.config();

const envConfig = {
  port: process.env.TEST_PORT,
  dbhost: process.env.DB_HOST,
  dbuser: process.env.DB_USERNAME,
  dbpassword: process.env.DB_PASSWORD,
  dbname: process.env.DB_DATABASENAME,
  dbtable: process.env.DB_MAINTABLE,
};

export { envConfig };

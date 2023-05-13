import * as dotenv from "dotenv";
dotenv.config();

const numPort = parseInt(process.env.TEST_PORT);

const envConfig = {
  port: isNaN(numPort) ? 3000 : numPort,
  dbhost: process.env.DB_HOST,
  dbuser: process.env.DB_USERNAME,
  dbpassword: process.env.DB_PASSWORD,
  dbname: process.env.DB_DATABASENAME,
  dbtable: process.env.DB_MAINTABLE,
};

const options = { skip: false };
const args = process.argv.slice(2);

if (
  args.some(
    (arg) =>
      arg.toLowerCase() === "-s" || arg.toLowerCase() === "--skip-recreate"
  )
) {
  options.skip = true;
}

export { envConfig, options };

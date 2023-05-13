import express from "express";

import cors from "cors";

import callLogger from "./middleware/logger.js";

import { envConfig } from "./utils/envUtils.js";

import routeValidators from "./middleware/validators/routes.js";
import usersRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";

const placeholderCB = (req, res) => {
  console.log(req.method, req.path);
  res.status(204).end();
};

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(callLogger());

  app.get("/test/users", usersRoutes.test_getUsers);

  app.get("/usuarios", placeholderCB);
  app.post("/usuarios", routeValidators.createUser, usersRoutes.createUser);
  app.post("/login", routeValidators.loginUser, loginRoutes.loginUser);
  app.all("*", (req, res) => {
    res.status(404).json({
      error: "¡Esta ruta no existe!",
    });
  });

  app.listen(envConfig.port, () => {
    console.log(`Server running on port ${envConfig.port}`);
  });
};

main();

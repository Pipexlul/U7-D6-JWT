import express from "express";

import cors from "cors";

import { envConfig } from "./utils/envUtils.js";

const placeholderCB = (req, res) => {
  console.log(req.method, req.path);
  res.status(204).end();
};

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/usuarios", placeholderCB);
  app.post("/usuarios", placeholderCB);
  app.post("/login", placeholderCB);

  app.listen(envConfig.port, () => {
    console.log(`Server running on port ${envConfig.port}`);
  });
};

main();

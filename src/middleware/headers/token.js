import jwt from "jsonwebtoken";

import { envConfig } from "../../utils/envUtils.js";

const validateToken = (req, res, next) => {
  const failedAuthMessage =
    "No se pudieron autenticar los datos, no tiene permiso para acceder a esta ruta, o su token ha expirado. Intente nuevamente.";

  const failAuth = () => {
    res.status(401).json({
      error: failedAuthMessage,
    });
  };

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    failAuth();
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, envConfig.jwtSecret);
    req.tokenPayload = payload;
    next();
  } catch (err) {
    console.error(err);
    failAuth();
  }
};

export default validateToken;

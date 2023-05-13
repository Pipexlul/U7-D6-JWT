const validateRoleLanguage = (req, res, next) => {
  const { rol, lenguage } = req.body;
  if (!rol || !lenguage) {
    res.status(400).json({
      error: "No se permiten campos vacios",
    });

    return;
  }

  next();
};

export default validateRoleLanguage;

const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: "No se permiten campos vacios",
    });

    return;
  }

  next();
};

export default validateUser;

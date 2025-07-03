const { verify } = require("jsonwebtoken");
const { SECRET, ADMIN_SECRET } = require("../constants/token");

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.user = { role: "notAuthenticated" };
    return next();
  }

  try {
    const decodedToken = verify(token, SECRET);

    req.user = { id: decodedToken.sub, role: "user" };

    return next();
  } catch (err) {
    try {
      // Se falhar, tenta verificar o token do admin
      const decodedAdminToken = verify(token, ADMIN_SECRET);

      req.user = { id: decodedAdminToken.sub, role: "admin" };

      return next();
    } catch (err) {
      return res.status(403).json({ error: "Token inválido ou não autorizado" });
    }
  }
};

module.exports = { ensureAuthenticated };

const { verify } = require("jsonwebtoken");
const { ADMIN_SECRET } = require("../constants/token");

const ensureAdminAuthentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decodedToken = verify(token, ADMIN_SECRET);

    const { sub } = decodedToken;

    req.user = { id: sub };

    return next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou não autorizado" });
  }
};

module.exports = { ensureAdminAuthentication };

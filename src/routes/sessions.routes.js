const { Router } = require("express");

const { checkSQLInjection } = require("../helpers/checkRoles");

const { CreateSessionController } = require("../controllers/sessions/createSession");

const sessionsRouter = Router();

sessionsRouter.post(`/`, async (req, res) => {
  try {
    const { email } = req.body;

    checkSQLInjection([email]);

    const manager = new CreateSessionController(email);
    const response = await manager.start();

    return res.json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = { sessionsRouter };

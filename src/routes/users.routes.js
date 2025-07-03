const { Router } = require("express");
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { ensureAdminAuthentication } = require("../middlewares/ensureAdminAuthentication");

//Helpers
const { checkIfIsIntegerNumber, checkSQLInjection } = require("../helpers/checkRoles");

const { GetUserController } = require("../controllers/users/getUser");
const { GetAllUsersController } = require("../controllers/users/getAllUsers");
const { CreateUsersController } = require("../controllers/users/createUsers");
const { UpdateUsersController } = require("../controllers/users/updateUsers");
const { DeleteUsersController } = require("../controllers/users/deleteUsers");

const usersRouter = Router();

usersRouter.get(`/:id`, ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    checkIfIsIntegerNumber(id);

    const getUserController = new GetUserController(id, req.user);
    const user = await getUserController.start();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

usersRouter.get(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const getAllUsersController = new GetAllUsersController();
    const users = await getAllUsersController.start();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

usersRouter.post(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { name, email } = req.body;

    checkSQLInjection([name, email]);

    const createUsersController = new CreateUsersController(name, email);
    const users = await createUsersController.start();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

usersRouter.put(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    checkIfIsIntegerNumber(id);
    checkSQLInjection([name]);

    const updateUsersController = new UpdateUsersController(id, name);
    const user = await updateUsersController.start();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

usersRouter.delete(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;

    checkIfIsIntegerNumber(id);

    const deleteUsersController = new DeleteUsersController(id);
    const user = await deleteUsersController.start();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { usersRouter };

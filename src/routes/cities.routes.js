const { Router } = require("express");

//Middlewares
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { ensureAdminAuthentication } = require("../middlewares/ensureAdminAuthentication");

//Helpers
const { checkNotAuthentication, checkIfIsIntegerNumber, checkSQLInjection } = require("../helpers/checkRoles");

//Controllers
const { GetAllCitiesController } = require("../controllers/cities/getAllCities");
const { CreateCitiesController } = require("../controllers/cities/createCities");
const { UpdateCitiesController } = require("../controllers/cities/updateCities");
const { DeleteCitiesController } = require("../controllers/cities/deleteCities");

const citiesRouter = Router();

citiesRouter.get(`/`, ensureAuthenticated, async (req, res) => {
  try {
    checkNotAuthentication(req.user);

    const getAllCitiesController = new GetAllCitiesController();
    const cities = await getAllCitiesController.start();

    return res.json(cities);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

citiesRouter.post(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id = null, name, id_country, id_region = null } = req.body;

    if (id) checkIfIsIntegerNumber(id);
    if (id_region) checkIfIsIntegerNumber(id_region);

    checkIfIsIntegerNumber(id_country);
    checkSQLInjection([name]);

    const createUsersController = new CreateCitiesController(id, name, id_country, id_region);
    const newCity = await createUsersController.start();

    return res.json(newCity);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

citiesRouter.put(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    checkIfIsIntegerNumber(id);
    checkSQLInjection([name]);

    const updateCitiesController = new UpdateCitiesController(id, name);
    const city = await updateCitiesController.start();

    return res.json(city);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

citiesRouter.delete(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;

    checkIfIsIntegerNumber(id);

    const deleteCitiesController = new DeleteCitiesController(id);
    const user = await deleteCitiesController.start();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { citiesRouter };

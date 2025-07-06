const { Router } = require("express");
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { ensureAdminAuthentication } = require("../middlewares/ensureAdminAuthentication");

//Helpers
const { checkIfIsIntegerNumber, checkSQLInjection } = require("../helpers/checkRoles");

const { GetAllCountriesController } = require("../controllers/countries/getAllCountries");
const { CreateCountriesController } = require("../controllers/countries/createCountries");
const { UpdateCountriesController } = require("../controllers/countries/updateCountries");
const { DeleteCountriesController } = require("../controllers/countries/deleteCountries");

const countriesRouter = Router();

countriesRouter.get(`/`, ensureAuthenticated, async (req, res) => {
  try {
    const getAllCountriesController = new GetAllCountriesController();
    const countries = await getAllCountriesController.start();

    return res.json(countries);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

countriesRouter.post(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id = null, name } = req.body;

    if (id) checkIfIsIntegerNumber(id);
    checkSQLInjection([name]);

    const createCountriesController = new CreateCountriesController(id, name);
    const country = await createCountriesController.start();

    return res.json(country);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

countriesRouter.put(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    checkIfIsIntegerNumber(id);
    checkSQLInjection([name]);

    const updateCountriesController = new UpdateCountriesController(id, name);
    const country = await updateCountriesController.start();

    return res.json(country);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

countriesRouter.delete(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;

    checkIfIsIntegerNumber(id);

    const deleteCountriesController = new DeleteCountriesController(id);
    const country = await deleteCountriesController.start();

    return res.json(country);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { countriesRouter };

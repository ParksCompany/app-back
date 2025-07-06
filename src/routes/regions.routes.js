const { Router } = require("express");
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { ensureAdminAuthentication } = require("../middlewares/ensureAdminAuthentication");

//Helpers
const { checkIfIsIntegerNumber, checkSQLInjection } = require("../helpers/checkRoles");

const { GetAllRegionsController } = require("../controllers/regions/getAllRegions");
const { CreateRegionsController } = require("../controllers/regions/createRegions");
const { UpdateRegionsController } = require("../controllers/regions/updateRegions");
const { DeleteRegionsController } = require("../controllers/regions/deleteRegions");

const regionsRouter = Router();

regionsRouter.get(`/`, ensureAuthenticated, async (req, res) => {
  try {
    const getAllRegiosnController = new GetAllRegionsController();
    const regions = await getAllRegiosnController.start();

    return res.json(regions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

regionsRouter.post(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id = null, id_country, name } = req.body;

    if (id) checkIfIsIntegerNumber(id);

    checkIfIsIntegerNumber(id_country);
    checkSQLInjection([name]);

    const createRegionsController = new CreateRegionsController(id, id_country, name);
    const regions = await createRegionsController.start();

    return res.json(regions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

regionsRouter.put(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    checkIfIsIntegerNumber(id);
    checkSQLInjection([name]);

    const updateRegionsController = new UpdateRegionsController(id, name);
    const regions = await updateRegionsController.start();

    return res.json(regions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

regionsRouter.delete(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;

    checkIfIsIntegerNumber(id);

    const deleteRegionsController = new DeleteRegionsController(id);
    const regions = await deleteRegionsController.start();

    return res.json(regions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { regionsRouter };

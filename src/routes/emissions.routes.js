const { Router } = require("express");

//Middlewares
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { ensureAdminAuthentication } = require("../middlewares/ensureAdminAuthentication");

//Controllers
const { GetEmissionsController } = require("../controllers/emissions/getEmissions");
const { CreateEmissionsController } = require("../controllers/emissions/createEmissions");
const { UpdateEmissionsController } = require("../controllers/emissions/updateEmissions");
const { DeleteEmissionsController } = require("../controllers/emissions/deleteEmissions");

const emissionsRouter = Router();

emissionsRouter.get(`/`, ensureAuthenticated, async (req, res) => {
  try {
    const { premium = null, departureCitiesId, destinyCitiesId, airlineName, airlineProgram } = req.query;

    const getEmissionsController = new GetEmissionsController(departureCitiesId, destinyCitiesId, airlineName, airlineProgram, premium, req.user);
    let emissions = await getEmissionsController.start();

    return res.json({ length: emissions.length, data: emissions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

emissionsRouter.post(`/`, ensureAdminAuthentication, async (req, res) => {
  try {
    const {
      premiumEmission,
      departureDates,
      returnDates,
      departureCityId,
      destinyCityId,
      airlineName,
      airlineProgram,
      departureMilesPrice,
      departureMoneyPrice,
      returnMilesPrice,
      returnMoneyPrice,
      totalMilesPrice,
      totalMoneyPrice,
      moneyUrl,
      milesUrl,
      cityImageUrl,
    } = req.body;

    const createEmissionsController = new CreateEmissionsController(
      premiumEmission,
      departureCityId,
      destinyCityId,
      airlineName,
      airlineProgram,
      departureMilesPrice,
      departureMoneyPrice,
      returnMilesPrice,
      returnMoneyPrice,
      totalMilesPrice,
      totalMoneyPrice,
      moneyUrl,
      milesUrl,
      cityImageUrl,
      departureDates,
      returnDates
    );

    const newEmission = await createEmissionsController.start();

    return res.json(newEmission);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

emissionsRouter.put(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updateEmissionsController = new UpdateEmissionsController(id, updateData);
    const updatedEmission = await updateEmissionsController.start();

    return res.json(updatedEmission);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

emissionsRouter.delete(`/:id`, ensureAdminAuthentication, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEmissionsController = new DeleteEmissionsController(id);
    const emission = await deleteEmissionsController.start();

    return res.json(emission);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { emissionsRouter };

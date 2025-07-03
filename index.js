require("dotenv/config");

//Middlewares
const middleware = require("./middleware");

//Repositories
const { getAllElements } = require("./repositories/redis");

//Controllers
const { StatusController } = require("./controllers/status");

//Services
const { ConfigurationsService } = require("./services/configurationsService");

exports.verifyAllItems = async (req, res) => {
  try {
    const configurationsService = new ConfigurationsService();

    //Pega todos os sellers das marcas
    const allElements = await getAllElements();

    //Número de workers que serão iniciados
    const numWorkers = configurationsService.calculateNumberofWorkers(allElements);

    const manager = new StatusController(allElements, numWorkers);
    await manager.start();

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.principal = (req, res) => {
  middleware(req, res, () => {
    exports.verifyAllItems(req, res);
  });
};

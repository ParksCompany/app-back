const { Router } = require("express");

const { usersRouter } = require("./users.routes");
const { sessionsRouter } = require("./sessions.routes");
const { citiesRouter } = require("./cities.routes");
const { emissionsRouter } = require("./emissions.routes");
const { favoritesRouter } = require("./favorites.routes");
const { countriesRouter } = require("./countries.routes");
const { regionsRouter } = require("./regions.routes");

const routes = Router();

routes.use(`/users`, usersRouter);
routes.use(`/countries`, countriesRouter);
routes.use(`/regions`, regionsRouter);
routes.use(`/cities`, citiesRouter);
routes.use(`/emissions`, emissionsRouter);
routes.use(`/favorites`, favoritesRouter);

routes.use(`/sessions`, sessionsRouter);

module.exports = routes;

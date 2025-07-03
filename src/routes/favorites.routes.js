const { Router } = require("express");

//Middlewares
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");

//Helpers
const { checkNotAuthentication, checkIfUserIsTheSame, checkIfIsIntegerNumber } = require("../helpers/checkRoles");

//Controllers
const { GetFavoritesController } = require("../controllers/favorites/getFavorites");
const { CreateFavoritesController } = require("../controllers/favorites/createFavorites");
const { DeleteFavoritesController } = require("../controllers/favorites/deleteFavorites");

const favoritesRouter = Router();

favoritesRouter.get(`/:userId`, ensureAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;

    checkIfIsIntegerNumber(userId);
    checkNotAuthentication(req.user);
    checkIfUserIsTheSame(req.user, userId);

    const getFavoritesController = new GetFavoritesController(userId);
    const favorites = await getFavoritesController.start();

    return res.json(favorites);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

favoritesRouter.post(`/`, ensureAuthenticated, async (req, res) => {
  try {
    const { userId, cityId } = req.body;

    checkIfIsIntegerNumber(userId);
    checkIfIsIntegerNumber(cityId);

    checkNotAuthentication(req.user);
    checkIfUserIsTheSame(req.user, userId);

    const createFavoritesController = new CreateFavoritesController(userId, cityId);
    const newFavorite = await createFavoritesController.start();

    return res.json(newFavorite);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

favoritesRouter.delete(`/`, ensureAuthenticated, async (req, res) => {
  try {
    const { userId, cityId } = req.query;

    checkIfIsIntegerNumber(userId);
    checkIfIsIntegerNumber(cityId);

    checkNotAuthentication(req.user);
    checkIfUserIsTheSame(req.user, userId);

    const deleteFavoritesController = new DeleteFavoritesController(userId, cityId);
    const favorite = await deleteFavoritesController.start();

    return res.json(favorite);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = { favoritesRouter };

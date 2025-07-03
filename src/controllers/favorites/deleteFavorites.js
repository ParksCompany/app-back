const { FavoritesRepository } = require("../../repositories/favorites");

class DeleteFavoritesController {
  constructor(userId, cityId) {
    this.userId = userId;
    this.cityId = cityId;
  }

  async start() {
    const favoritesRepository = new FavoritesRepository();

    const userfavoriteRecords = await favoritesRepository.getFavoritesByUser(this.userId);

    const cityIdExists = userfavoriteRecords.find((el) => el.id_cities === Number(this.cityId));

    if (!cityIdExists) throw new Error(`Essa cidade não está vinculada ao usuário.`);

    await favoritesRepository.deleteFavorites(cityIdExists.id_favorites);

    return {
      message: "Associação deletada com sucesso.",
    };
  }
}

module.exports = { DeleteFavoritesController };

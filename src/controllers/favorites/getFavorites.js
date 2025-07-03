const { UsersRepository } = require("../../repositories/users");
const { FavoritesRepository } = require("../../repositories/favorites");

class GetFavoritesController {
  constructor(userId) {
    this.userId = userId;
  }

  async start() {
    const usersRepository = new UsersRepository();
    const favoritesRepository = new FavoritesRepository();

    //Validation of departure city names filter
    const user = await usersRepository.getUserById(this.userId);

    if (!user) throw new Error(`O usuário não existe.`);

    let favorites = await favoritesRepository.getFavoritesByUser(this.userId);

    favorites = favorites.map((item) => {
      return {
        id: item.id_cities,
        name: item.city,
        country: item.country,
      };
    });

    return {
      id: user.id,
      name: user.name,
      favorites: favorites,
    };
  }
}

module.exports = { GetFavoritesController };

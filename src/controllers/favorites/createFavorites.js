const moment = require("moment-timezone");

const { UsersRepository } = require("../../repositories/users");
const { CitiesRepository } = require("../../repositories/cities");
const { FavoritesRepository } = require("../../repositories/favorites");

class CreateFavoritesController {
  constructor(userId, cityId) {
    this.userId = userId;
    this.cityId = cityId;
  }

  async start() {
    const usersRepository = new UsersRepository();
    const citiesRepository = new CitiesRepository();
    const favoritesRepository = new FavoritesRepository();

    //Validation if user exists
    const user = await usersRepository.getUserById(this.userId);
    if (!user) throw new Error(`O usuário não existe.`);

    //Validation if city exists
    const city = await citiesRepository.getCityById(this.cityId);
    if (!city) throw new Error(`A cidade não existe.`);

    //create association date
    const created_at = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm");

    await favoritesRepository.createFavorites(this.userId, this.cityId, created_at);

    return {
      user: user.name,
      city: city.name,
      message: "Associação criada com sucesso.",
    };
  }
}

module.exports = { CreateFavoritesController };

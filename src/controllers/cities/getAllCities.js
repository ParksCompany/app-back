const { CitiesRepository } = require("../../repositories/cities");

class GetAllCitiesController {
  async start() {
    const citiesRepository = new CitiesRepository();
    const cities = await citiesRepository.getAllCities();

    return { length: cities.length, data: cities };
  }
}

module.exports = { GetAllCitiesController };

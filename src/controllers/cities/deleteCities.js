const { CitiesRepository } = require("../../repositories/cities");

class DeleteCitiesController {
  constructor(id) {
    this.id = id;
  }

  async start() {
    const citiesRepository = new CitiesRepository();

    //verify if city already exists
    const cityAlreadyExists = await citiesRepository.getCityById(this.id);
    if (!cityAlreadyExists) throw new Error(`A cidade não existe.`);

    await citiesRepository.deleteCities(this.id);

    return {
      id: cityAlreadyExists.id_cities,
      name: cityAlreadyExists.name,
    };
  }
}

module.exports = { DeleteCitiesController };

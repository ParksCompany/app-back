const { CitiesRepository } = require("../../repositories/cities");

class UpdateCitiesController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async start() {
    const citiesRepository = new CitiesRepository();

    //verify if city already exists
    const cityAlreadyExists = await citiesRepository.getCityById(this.id);
    if (!cityAlreadyExists) throw new Error(`A cidade não existe.`);

    await citiesRepository.editCities(this.id, this.name);

    return {
      id: cityAlreadyExists.id_cities,
      name: this.name,
    };
  }
}

module.exports = { UpdateCitiesController };

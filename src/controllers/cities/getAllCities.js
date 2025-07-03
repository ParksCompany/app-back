const { checkSQLInjection } = require("../../helpers/checkRoles");

const { CitiesRepository } = require("../../repositories/cities");
const { CountriesRepository } = require("../../repositories/countries");

class GetAllCitiesController {
  constructor(country) {
    this.country = country;
  }

  async start() {
    if (this.country) {
      checkSQLInjection([this.country]);
      const countriesRepository = new CountriesRepository();
      const country = await countriesRepository.getCountryByName(this.country);
      if (!country) throw new Error(`O país selecionado não existe na base ou está escrito de forma incorreta.`);
    }

    const citiesRepository = new CitiesRepository();
    const cities = await citiesRepository.getAllCities(this.country);

    return cities;
  }
}

module.exports = { GetAllCitiesController };

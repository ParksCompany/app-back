const { CountriesRepository } = require("../../repositories/countries");

class GetAllCountriesController {
  async start() {
    const countriesRepository = new CountriesRepository();
    const countries = await countriesRepository.getAllCountries();

    const countriesID = countries.map((item) => {
      return { id: item.id_countries, name: item.name };
    });

    return { length: countriesID.length, data: countriesID };
  }
}

module.exports = { GetAllCountriesController };

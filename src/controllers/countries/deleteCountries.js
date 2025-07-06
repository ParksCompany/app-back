const { CountriesRepository } = require("../../repositories/countries");

class DeleteCountriesController {
  constructor(id) {
    this.id = id;
  }

  async start() {
    const countriesRepository = new CountriesRepository();

    if (!this.id) {
      throw new Error(`Você precisa fornecer um ID`);
    }

    //verify if country already exists
    const countryAlreadyExists = await countriesRepository.getCountryById({ id: this.id });
    if (!countryAlreadyExists) throw new Error(`O país não existe.`);

    await countriesRepository.deleteCountries({ id: this.id });

    return countryAlreadyExists;
  }
}

module.exports = { DeleteCountriesController };

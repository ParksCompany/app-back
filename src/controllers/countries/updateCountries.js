const { CountriesRepository } = require("../../repositories/countries");

class UpdateCountriesController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async start() {
    const countriesRepository = new CountriesRepository();

    if (!this.id || !this.name) {
      throw new Error(`Você precisa fornecer um ID e um nome`);
    }

    //verify if country already exists
    const countryAlreadyExists = await countriesRepository.getCountryById({ id: this.id });
    if (!countryAlreadyExists) throw new Error(`O país não existe.`);

    await countriesRepository.editCountries({ id: this.id, name: this.name });

    countryAlreadyExists.name = this.name;
    return countryAlreadyExists;
  }
}

module.exports = { UpdateCountriesController };

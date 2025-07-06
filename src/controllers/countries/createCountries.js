const { CountriesRepository } = require("../../repositories/countries");

class CreateCountriesController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async start() {
    const countriesRepository = new CountriesRepository();

    if (this.id) {
      //verify if country already exists
      const countryAlreadyExists = await countriesRepository.getCountryById({ id: this.id });
      if (countryAlreadyExists) throw new Error(`O país já existe.`);
    }

    await countriesRepository.createCountries({ id: this.id ? this.id : null, name: this.name });

    if (this.id) {
      return {
        id: this.id,
        name: this.name,
      };
    }

    const country = await countriesRepository.getCountryByName(this.name);

    return {
      id: country.id_countries,
      name: country.name,
    };
  }
}

module.exports = { CreateCountriesController };

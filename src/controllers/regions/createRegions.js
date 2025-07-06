const { RegionsRepository } = require("../../repositories/regions");
const { CountriesRepository } = require("../../repositories/countries");

class CreateRegionsController {
  constructor(id, idCountry, name) {
    this.id = id;
    this.idCountry = idCountry;
    this.name = name;
  }

  async start() {
    const regionsRepository = new RegionsRepository();
    const countriesRepository = new CountriesRepository();

    if (!this.idCountry || !this.name) throw new Error(`Faltam informações a serem passadas`);

    if (this.id) {
      //verify if regions already exists
      const regionAlreadyExists = await regionsRepository.getRegionsById({ id: this.id });
      if (regionAlreadyExists) throw new Error(`A região já existe.`);
    }

    //verify if country exists
    const countryExists = await countriesRepository.getCountryById({ id: this.idCountry });
    if (!countryExists) throw new Error(`O país não existe.`);

    const newRegion = await regionsRepository.createRegions({ id: this.id ? this.id : null, name: this.name, idCountries: this.idCountry });

    // if (this.id) {
    //   return {
    //     id: this.id,
    //     id_country: this.idCountry,
    //     name: this.name,
    //   };
    // }

    return {
      id: newRegion,
      country: countryExists.name,
      name: this.name,
    };
  }
}

module.exports = { CreateRegionsController };

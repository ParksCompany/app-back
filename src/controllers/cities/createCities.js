const { CitiesRepository } = require("../../repositories/cities");
const { CountriesRepository } = require("../../repositories/countries");
const { RegionsRepository } = require("../../repositories/regions");

class CreateCitiesController {
  constructor(id, name, id_country, id_region) {
    this.id = id;
    this.name = name;
    this.id_country = id_country;
    this.id_region = id_region;
  }

  async start() {
    const countriesRepository = new CountriesRepository();
    const regionsRepository = new RegionsRepository();
    const citiesRepository = new CitiesRepository();

    //Verify data on request body
    if (!this.name || !this.id_country) throw new Error(`Os dados passados são insuficientes.`);

    //select the country of the city
    const country = await countriesRepository.getCountryById({ id: this.id_country });
    if (!country) throw new Error(`O país selecionado não existe na base ou está escrito de forma incorreta.`);

    //select the region of the city
    let selectedRegion = null;

    if (this.id_region) {
      selectedRegion = await regionsRepository.getRegionsById({ id: this.id_region });
      if (!selectedRegion) throw new Error(`A região selecionada não existe na base ou está escrita de forma incorreta.`);
    }

    //verify if city already exists
    if (this.id) {
      const cityAlreadyExists = await citiesRepository.getCityById(this.id);
      if (cityAlreadyExists) throw new Error(`A cidade já existe.`);
    }

    const city = await citiesRepository.createCities({
      id: this.id ? this.id : null,
      id_country: this.id_country,
      name: this.name,
      id_region: this.id_region ? this.id_region : null,
    });

    return {
      id: city,
      country: country.name,
      name: this.name,
      region: selectedRegion !== null ? selectedRegion.name : selectedRegion,
    };
  }
}

module.exports = { CreateCitiesController };

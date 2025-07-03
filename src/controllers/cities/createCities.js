const { CitiesRepository } = require("../../repositories/cities");
const { CountriesRepository } = require("../../repositories/countries");
const { RegionsRepository } = require("../../repositories/regions");

class CreateCitiesController {
  constructor(city, country, region) {
    this.city = city;
    this.country = country;
    this.region = region;
  }

  async start() {
    const countriesRepository = new CountriesRepository();
    const regionsRepository = new RegionsRepository();
    const citiesRepository = new CitiesRepository();

    //Verify data on request body
    if (!this.city || !this.country) throw new Error(`Os dados passados são insuficientes.`);

    //select the country of the city
    const country = await countriesRepository.getCountryByName(this.country);
    if (!country) throw new Error(`O país selecionado não existe na base ou está escrito de forma incorreta.`);

    //select the region of the city (just for brasil)
    let region = null;

    if (this.country === "Brasil" || this.country === "brasil") {
      region = await regionsRepository.getRegionsByName(this.region);
      if (!region) throw new Error(`A região selecionada não existe na base ou está escrita de forma incorreta.`);
    }

    //verify if city already exists
    const cityAlreadyExists = await citiesRepository.getCityByName(this.city);
    if (cityAlreadyExists) throw new Error(`A cidade já existe.`);

    const city = await citiesRepository.createCities(this.city, region ? region?.id_regions : null, country?.id_countries);

    return {
      id: city,
      country: this.country,
      name: this.city,
      region: this.country === "Brasil" || this.country === "brasil" ? this.region : null,
    };
  }
}

module.exports = { CreateCitiesController };

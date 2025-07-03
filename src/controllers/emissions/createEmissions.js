const moment = require("moment-timezone");

const { CitiesRepository } = require("../../repositories/cities");
const { EmissionsRepository } = require("../../repositories/emissions");
const { EmissionsDatesRepository } = require("../../repositories/emissions_dates");
const { EmissionsService } = require("../../services/emissionsService");

class CreateEmissionsController {
  constructor(
    premiumEmission,
    departureCityName,
    destinyCityName,
    airlineName,
    airlineProgram,
    departureMilesPrice,
    departureMoneyPrice,
    returnMilesPrice,
    returnMoneyPrice,
    totalMilesPrice,
    totalMoneyPrice,
    moneyUrl,
    milesUrl,
    cityImageUrl,
    departureDates,
    returnDates
  ) {
    this.premiumEmission = premiumEmission;
    this.departureCityName = departureCityName;
    this.destinyCityName = destinyCityName;
    this.airlineName = airlineName;
    this.airlineProgram = airlineProgram;
    this.departureMilesPrice = departureMilesPrice;
    this.departureMoneyPrice = departureMoneyPrice;
    this.returnMilesPrice = returnMilesPrice;
    this.returnMoneyPrice = returnMoneyPrice;
    this.totalMilesPrice = totalMilesPrice;
    this.totalMoneyPrice = totalMoneyPrice;
    this.moneyUrl = moneyUrl;
    this.milesUrl = milesUrl;
    this.cityImageUrl = cityImageUrl;
    this.departureDates = departureDates;
    this.returnDates = returnDates;
  }

  async start() {
    const emissionsRepository = new EmissionsRepository();
    const citiesRepository = new CitiesRepository();
    const emissionsService = new EmissionsService();
    const emissionsDatesRepository = new EmissionsDatesRepository();

    //Cities data object
    const emissionCitiesData = {
      departureCityName: this.departureCityName,
      destinyCityName: this.destinyCityName,
      departureDates: this.departureDates,
      returnDates: this.returnDates,
    };

    //Check if body has cities data
    emissionsService.validateCitiesRegistersInCreateEmissions(emissionCitiesData);

    //verify if departure city exists
    const departureCity = await citiesRepository.getCityByName(this.departureCityName);
    if (!departureCity) throw new Error(`A cidade ${this.departureCityName} não existe na base de cidades`);

    //verify if destiny city exists
    const destinyCity = await citiesRepository.getCityByName(this.destinyCityName);
    if (!destinyCity) throw new Error(`A cidade ${this.destinyCity} não existe na base de cidades`);

    //Emission data to create
    const emissionData = {
      premiumEmission: this.premiumEmission === false ? 0 : 1,
      departureDates: this.departureDates,
      returnDates: this.returnDates,
      departureCityId: departureCity.id_cities,
      destinyCityId: destinyCity.id_cities,
      airlineName: this.airlineName,
      airlineProgram: this.airlineProgram,
      departureMilesPrice: this.departureMilesPrice,
      departureMoneyPrice: this.departureMoneyPrice,
      returnMilesPrice: this.returnMilesPrice,
      returnMoneyPrice: this.returnMoneyPrice,
      totalMilesPrice: this.totalMilesPrice,
      totalMoneyPrice: this.totalMoneyPrice,
      moneyUrl: this.moneyUrl,
      milesUrl: this.milesUrl,
      cityImageUrl: this.cityImageUrl ? this.cityImageUrl : null,
      created_at: moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm"),
    };

    //Check if all registers exists in emission data object
    emissionsService.validateRegistersInCreateEmissions(emissionData);

    //create new emission and get emission id
    const newEmissionId = await emissionsRepository.createEmission(emissionData);

    //insert new emission departure and return dates
    await Promise.all([
      emissionsDatesRepository.createEmissionDateByRoundTrip(newEmissionId, "departure", this.departureDates),
      emissionsDatesRepository.createEmissionDateByRoundTrip(newEmissionId, "return", this.returnDates),
    ]);

    return emissionData;
  }
}

module.exports = { CreateEmissionsController };

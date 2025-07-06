const moment = require("moment-timezone");

const { areAllDatesValid } = require("../../helpers/utils");

const { CitiesRepository } = require("../../repositories/cities");
const { EmissionsRepository } = require("../../repositories/emissions");
const { EmissionsDatesRepository } = require("../../repositories/emissions_dates");
const { EmissionsService } = require("../../services/emissionsService");

class CreateEmissionsController {
  constructor(
    premiumEmission,
    departureCityId,
    destinyCityId,
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
    this.departureCityId = departureCityId;
    this.destinyCityId = destinyCityId;
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
      departureCityId: this.departureCityId,
      destinyCityId: this.destinyCityId,
      departureDates: this.departureDates,
      returnDates: this.returnDates,
    };

    //Check if body has cities data
    emissionsService.validateCitiesRegistersInCreateEmissions(emissionCitiesData);

    //verify if departure city exists
    const departureCity = await citiesRepository.getCityById(this.departureCityId);
    if (!departureCity) throw new Error(`A cidade embarque de ID ${this.departureCityId} não existe na base de cidades`);

    //verify if destiny city exists
    const destinyCity = await citiesRepository.getCityById(this.destinyCityId);
    if (!destinyCity) throw new Error(`A cidade destino de ID ${this.destinyCityId} não existe na base de cidades`);

    //verify if departure and return dates are valid
    const departureDatesAreValid = areAllDatesValid(this.departureDates);
    const returnDatesAreValid = areAllDatesValid(this.returnDates);

    if (departureDatesAreValid === false || returnDatesAreValid === false) {
      throw new Error(`As datas de embarque e destino devem estar no formato YYYY-MM-DD HH:mm`);
    }

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

    delete emissionData.premiumEmission;
    delete emissionData.departureCityId;
    delete emissionData.destinyCityId;

    return {
      premiumEmission: this.premiumEmission,
      departureCity: departureCity.name,
      destinyCity: destinyCity.name,
      ...emissionData,
    };
  }
}

module.exports = { CreateEmissionsController };

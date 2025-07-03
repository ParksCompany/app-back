const { EmissionsRepository } = require("../../repositories/emissions");
const { CitiesService } = require("../../services/citiesService");
const { EmissionsService } = require("../../services/emissionsService");
const { EmissionsDatesRepository } = require("../../repositories/emissions_dates");

const { transformStringToArray } = require("../../helpers/utils");

class GetEmissionsController {
  constructor(departureCities, destinyCities, airlineName, airlineProgram, premium) {
    this.departureCities = departureCities;
    this.destinyCities = destinyCities;
    this.airlineName = airlineName;
    this.airlineProgram = airlineProgram;
    this.premium = premium;
  }

  async start() {
    const citiesService = new CitiesService();
    const emissionsService = new EmissionsService();
    const emissionsRepository = new EmissionsRepository();
    const emissionsDatesRepository = new EmissionsDatesRepository();

    //Transforma as strings dos filtros em array para serem usadas
    const departureCities = transformStringToArray(this.departureCities);
    const destinyCities = transformStringToArray(this.destinyCities);
    const airlineName = transformStringToArray(this.airlineName);
    const airlineProgram = transformStringToArray(this.airlineProgram);
    const premium = transformStringToArray(this.premium);

    //Validation of departure city names filter
    const departureCitiesData = departureCities ? await citiesService.getCitiesDataByListOfNames(departureCities) : null;

    //Validation of destiny city names filter
    const destinyCitiesData = destinyCities ? await citiesService.getCitiesDataByListOfNames(destinyCities) : null;

    //get all emissions
    const emissions = await emissionsRepository.getAllEmissions(premium, departureCitiesData, destinyCitiesData, airlineName, airlineProgram);

    //get all emissions dates
    const emissionDates = await emissionsDatesRepository.getAllEmissionDates();

    //get emissions with dates
    const emissionsWithDates = await emissionsService.consolidatesEmissionsDatesInArray(emissions, emissionDates);

    return emissionsService.formatEmissionsArray(emissionsWithDates);
  }
}

module.exports = { GetEmissionsController };

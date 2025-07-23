//Repositories
const { EmissionsRepository } = require("../../repositories/emissions");
const { UsersRepository } = require("../../repositories/users");
const { EmissionsDatesRepository } = require("../../repositories/emissions_dates");

//Services
const { EmissionsService } = require("../../services/emissionsService");

//Helpers
const { transformStringToArray, parseBoolean } = require("../../helpers/utils");

class GetEmissionsController {
  constructor(departureCitiesId, destinyCitiesId, airlineName, airlineProgram, premium, user) {
    this.departureCitiesId = departureCitiesId;
    this.destinyCitiesId = destinyCitiesId;
    this.airlineName = airlineName;
    this.airlineProgram = airlineProgram;
    this.premium = premium;
    this.user = user;
  }

  async start() {
    const usersRepository = new UsersRepository();
    const emissionsService = new EmissionsService();
    const emissionsRepository = new EmissionsRepository();
    const emissionsDatesRepository = new EmissionsDatesRepository();

    //Transforma as strings dos filtros em array para serem usadas
    const airlineName = transformStringToArray(this.airlineName);
    const airlineProgram = transformStringToArray(this.airlineProgram);

    //Controles de usuário premium ou não
    let shouldBePremium = false;
    let premium = parseBoolean(this.premium);

    if (this.user.role === "notAuthenticated") premium = false;

    if (this.user.role === "admin") shouldBePremium = true;

    if (this.user.role === "user") {
      const user = await usersRepository.getUserById(this.user.id);
      shouldBePremium = user.isPremium === 1 ? true : false;
      if (shouldBePremium === false) premium = false;
    }

    if (premium === true && shouldBePremium === false) throw new Error(`O usuário não tem nível para acessar emissões premium`);

    //get all emissions
    const emissions = await emissionsRepository.getAllEmissions(premium, this.departureCitiesId, this.destinyCitiesId, airlineName, airlineProgram);

    //get all emissions dates
    const emissionDates = await emissionsDatesRepository.getAllEmissionDates();

    //get emissions with dates
    const emissionsWithDates = await emissionsService.consolidatesEmissionsDatesInArray(emissions, emissionDates);

    return emissionsService.formatEmissionsArray(emissionsWithDates);
  }
}

module.exports = { GetEmissionsController };

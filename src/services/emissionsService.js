class EmissionsService {
  formatEmissionsArray = (emissions) => {
    return emissions.map((item) => {
      const id = item.id_emissions;
      const premiumEmission = item.premiumEmission === 1 ? true : false;

      delete item.id_emissions;
      delete item.departureCityId;
      delete item.destinyCityId;
      delete item.premiumEmission;

      return {
        id: id,
        premiumEmission: premiumEmission,
        ...item,
      };
    });
  };

  validateRegistersInCreateEmissions = (emissionData) => {
    // Lista dos campos obrigatórios
    const requiredFields = [
      "premiumEmission",
      "departureCityId",
      "destinyCityId",
      "airlineName",
      "airlineProgram",
      "departureMilesPrice",
      "departureMoneyPrice",
      "returnMilesPrice",
      "returnMoneyPrice",
      "totalMilesPrice",
      "totalMoneyPrice",
      "moneyUrl",
      "milesUrl",
    ];

    // Verifica se algum campo obrigatório está ausente
    const missingFields = requiredFields.filter((field) => emissionData[field] === undefined || emissionData[field] === null || emissionData[field] === "");

    if (missingFields.length > 0) {
      throw new Error(`Os seguintes campos são obrigatórios e estão faltando: ${missingFields.join(", ")}`);
    }
  };

  validateCitiesRegistersInCreateEmissions = (emissionCitiesData) => {
    // Lista dos campos obrigatórios
    const requiredFields = ["departureCityName", "destinyCityName", "departureDates", "returnDates"];

    // Verifica se algum campo obrigatório está ausente
    const missingFields = requiredFields.filter(
      (field) => emissionCitiesData[field] === undefined || emissionCitiesData[field] === null || emissionCitiesData[field] === ""
    );

    if (missingFields.length > 0) {
      throw new Error(`Os seguintes campos são obrigatórios e estão faltando: ${missingFields.join(", ")}`);
    }

    if (emissionCitiesData.departureDates.length === 0 || emissionCitiesData.returnDates.length === 0) {
      throw new Error(`DepartureDates e ReturnDates precisam ter dados`);
    }
  };

  consolidatesEmissionsDatesInArray = (emissionArray, emissionsDatesArray) => {
    return emissionArray.map((item) => {
      const emissionDepartureDates = emissionsDatesArray.filter((el) => el.id_emissions === item.id_emissions && el.roundTrip === "departure");
      const emissionReturnDates = emissionsDatesArray.filter((el) => el.id_emissions === item.id_emissions && el.roundTrip === "return");

      return {
        departureDates: emissionDepartureDates?.map((el) => el.date),
        returnDates: emissionReturnDates?.map((el) => el.date),
        ...item,
      };
    });
  };
}

module.exports = { EmissionsService };

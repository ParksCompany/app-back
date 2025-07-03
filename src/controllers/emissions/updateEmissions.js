const { EmissionsRepository } = require("../../repositories/emissions");
const { EmissionsDatesRepository } = require("../../repositories/emissions_dates");

class UpdateEmissionsController {
  constructor(id, updateData) {
    this.id = id;
    this.updateData = updateData;
  }

  async start() {
    const emissionsRepository = new EmissionsRepository();
    const emissionsDatesRepository = new EmissionsDatesRepository();

    // verify if emission exists
    const emissionExists = await emissionsRepository.getEmissionById(this.id);
    if (!emissionExists) {
      throw new Error(`A emissão com ID ${this.id} não existe.`);
    }

    //create emission dates object
    const dates = {
      ...(this.updateData.returnDates !== undefined && { returnDates: this.updateData.returnDates }),
      ...(this.updateData.departureDates !== undefined && { departureDates: this.updateData.departureDates }),
    };

    // update the emission fields sent in response body
    await emissionsRepository.updateEmission(this.id, this.updateData);

    //update emission departure date
    if (dates.departureDates && dates.departureDates.length > 0) {
      await emissionsDatesRepository.deleteEmissionDatesById(this.id, "departure");
      await emissionsDatesRepository.createEmissionDateByRoundTrip(this.id, "departure", dates.departureDates);
    }

    //update emission return date
    if (dates.returnDates && dates.returnDates.length > 0) {
      await emissionsDatesRepository.deleteEmissionDatesById(this.id, "return");
      await emissionsDatesRepository.createEmissionDateByRoundTrip(this.id, "return", dates.returnDates);
    }

    // return the data updated
    return {
      id: this.id,
      ...this.updateData,
      ...dates,
    };
  }
}

module.exports = { UpdateEmissionsController };

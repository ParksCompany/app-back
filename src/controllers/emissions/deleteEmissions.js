const { EmissionsRepository } = require("../../repositories/emissions");

class DeleteEmissionsController {
  constructor(id) {
    this.id = id;
  }

  async start() {
    const emissionsRepository = new EmissionsRepository();

    // Verifica if emission exists
    const emissionExists = await emissionsRepository.getEmissionById(this.id);
    if (!emissionExists) throw new Error(`A emissão com ID ${this.id} não existe.`);

    await emissionsRepository.deleteEmission(this.id);

    return emissionExists;
  }
}

module.exports = { DeleteEmissionsController };

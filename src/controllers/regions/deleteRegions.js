const { RegionsRepository } = require("../../repositories/regions");

class DeleteRegionsController {
  constructor(id) {
    this.id = id;
  }

  async start() {
    const regionsRepository = new RegionsRepository();

    if (!this.id) {
      throw new Error(`Você precisa fornecer um ID`);
    }

    //verify if regions already exists
    const regionAlreadyExists = await regionsRepository.getRegionsById({ id: this.id });
    if (!regionAlreadyExists) throw new Error(`A região não existe.`);

    await regionsRepository.deleteRegions({ id: this.id });

    return regionAlreadyExists;
  }
}

module.exports = { DeleteRegionsController };

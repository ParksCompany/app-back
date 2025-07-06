const { RegionsRepository } = require("../../repositories/regions");

class UpdateRegionsController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async start() {
    const regionsRepository = new RegionsRepository();

    if (!this.id || !this.name) {
      throw new Error(`Você precisa fornecer um ID e um nome`);
    }

    //verify if regions already exists
    const regionAlreadyExists = await regionsRepository.getRegionsById({ id: this.id });
    if (!regionAlreadyExists) throw new Error(`A região não existe.`);

    await regionsRepository.editRegions({ id: this.id, name: this.name });

    regionAlreadyExists.name = this.name;
    return regionAlreadyExists;
  }
}

module.exports = { UpdateRegionsController };

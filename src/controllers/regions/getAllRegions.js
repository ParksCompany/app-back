const { RegionsRepository } = require("../../repositories/regions");

class GetAllRegionsController {
  async start() {
    const regionsRepository = new RegionsRepository();
    const regions = await regionsRepository.getAllRegions();

    const regionsID = regions.map((item) => {
      return { id: item.id_regions, id_country: item.id_countries, name: item.name };
    });

    return { length: regionsID.length, data: regionsID };
  }
}

module.exports = { GetAllRegionsController };

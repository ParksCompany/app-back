const { MySqlConnection } = require("../database/mysql");

class RegionsRepository {
  getRegionsByName = async (region) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.regions
        where name like '${region}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a região ${region}`);
    }
  };
}

module.exports = { RegionsRepository };

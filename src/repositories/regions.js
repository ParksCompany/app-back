const { MySqlConnection } = require("../database/mysql");

class RegionsRepository {
  getAllRegions = async () => {
    try {
      const query = `SELECT * FROM emissionsApp.regions order by id_regions desc;`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a região de ID ${id}`);
    }
  };

  getRegionsById = async ({ id }) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.regions
        where id_regions like '${id}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a região de ID ${id}`);
    }
  };

  getRegionsByNameAndCountry = async ({ idCountry, name }) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.regions
        where name like '${region}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a região ${name} do país de ID ${idCountry}`);
    }
  };

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

  createRegions = async ({ id = null, idCountries, name }) => {
    try {
      const queryWithID = `INSERT INTO emissionsApp.regions (id_regions, id_countries, name) VALUES ('${id}', '${idCountries}', '${name}');`;
      const queryNoID = `INSERT INTO emissionsApp.regions (id_countries, name) VALUES ('${idCountries}', '${name}');`;

      const query = id ? queryWithID : queryNoID;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao criar a região ${name}.`);
    }
  };

  editRegions = async ({ id, name }) => {
    try {
      const query = `UPDATE emissionsApp.regions SET name = '${name}' WHERE (id_regions = '${id}');`;

      const [response] = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao editar a região de ID ${id}.`);
    }
  };

  deleteRegions = async ({ id }) => {
    try {
      const query = `DELETE FROM emissionsApp.regions WHERE (id_regions = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao deletar a região de ID ${id}.`);
    }
  };
}

module.exports = { RegionsRepository };

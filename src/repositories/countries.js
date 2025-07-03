const { MySqlConnection } = require("../database/mysql");

class CountriesRepository {
  getCountryById = async (country) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.countries
        where name like '${country}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o país ${country}`);
    }
  };

  getCountryByName = async (country) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.countries
        where name like '${country}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o país ${country}`);
    }
  };
}

module.exports = { CountriesRepository };

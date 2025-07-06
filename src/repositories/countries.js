const { MySqlConnection } = require("../database/mysql");

class CountriesRepository {
  getAllCountries = async () => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.countries
        order by id_countries desc
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a lista dos países`);
    }
  };

  getCountryById = async ({ id }) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.countries
        where id_countries like '${id}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o país de ID ${id}`);
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

  createCountries = async ({ id = null, name }) => {
    try {
      const queryWithID = `INSERT INTO emissionsApp.countries (id_countries, name) VALUES ('${id}', '${name}');`;
      const queryNoID = `INSERT INTO emissionsApp.countries (name) VALUES ('${name}');`;

      const query = id ? queryWithID : queryNoID;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao criar o país ${name}.`);
    }
  };

  editCountries = async ({ id, name }) => {
    try {
      const query = `UPDATE emissionsApp.countries SET name = '${name}' WHERE (id_countries = '${id}');`;

      const [response] = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao editar o país de ID ${id}.`);
    }
  };

  deleteCountries = async ({ id }) => {
    try {
      const query = `DELETE FROM emissionsApp.countries WHERE (id_countries = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao deletar o país de ID ${id}.`);
    }
  };
}

module.exports = { CountriesRepository };

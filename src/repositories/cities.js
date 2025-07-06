const { MySqlConnection } = require("../database/mysql");

class CitiesRepository {
  getAllCities = async () => {
    try {
      const query = `
        SELECT CITIES.id_cities as id, CITIES.name as city, COUNTRIES.name as country, REGIONS.name as region
        FROM emissionsApp.cities CITIES
        LEFT JOIN countries COUNTRIES 
        ON COUNTRIES.id_countries = CITIES.id_countries
        LEFT JOIN regions REGIONS 
        ON REGIONS.id_regions = CITIES.id_regions
        order by COUNTRIES.name asc
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar as cidades`);
    }
  };

  getCityById = async (cityId) => {
    try {
      const query = `
        SELECT * FROM emissionsApp.cities
        WHERE id_cities like '${cityId}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a cidade de Id ${cityId}`);
    }
  };

  getCityByName = async (city) => {
    try {
      const query = `
        SELECT * FROM emissionsApp.cities CITIES
        WHERE name like '${city}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a cidade ${city}`);
    }
  };

  getCitiesByNameArray = async (cities) => {
    try {
      // Transformando o array em uma string no formato correto para o SQL
      const citiesString = cities.map((city) => `'${city}'`).join(",");

      const query = `
        SELECT * FROM emissionsApp.cities CITIES
        WHERE name IN (${citiesString})
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar as cidades da lista.`);
    }
  };

  createCities = async ({ id = null, name, id_region, id_country }) => {
    try {
      const region = id_region !== null ? `'${id_region}'` : null;

      const queryNoID = `INSERT INTO emissionsApp.cities (id_regions, id_countries, name) VALUES 
      (${region}, '${id_country}', '${name}');`;

      const queryWithID = `INSERT INTO emissionsApp.cities (id_cities, id_regions, id_countries, name) VALUES 
      ('${id}', ${region}, '${id_country}', '${name}');`;

      const query = id ? queryWithID : queryNoID;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao criar a cidade ${name}.`);
    }
  };

  editCities = async (id, name) => {
    try {
      const query = `UPDATE emissionsApp.cities SET name = '${name}' WHERE (id_cities = '${id}');`;

      const [response] = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao atualizar a cidade ${name}.`);
    }
  };

  deleteCities = async (id) => {
    try {
      const query = `DELETE FROM emissionsApp.cities WHERE (id_cities = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao excluir a cidade.`);
    }
  };
}

module.exports = { CitiesRepository };

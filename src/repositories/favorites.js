const { MySqlConnection } = require("../database/mysql");

class FavoritesRepository {
  getFavoritesByUser = async (userId) => {
    try {
      const query = `
        SELECT F.id_favorites, C.id_cities, C.name as city, CO.name as country FROM emissionsApp.favorites F
        LEFT JOIN cities C ON C.id_cities = F.id_cities
        LEFT JOIN countries CO ON C.id_countries = CO.id_countries
        WHERE F.id_user = ${userId}
        order by F.created_at desc
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar os países favoritos do usuário ${userId}`);
    }
  };

  getAllFavorites = async () => {
    try {
      const query = `
        SELECT F.id_favorites, U.name as user, C.id_cities, C.name as city, CO.name as countries FROM emissionsApp.favorites F
        LEFT JOIN users U ON U.id_user = F.id_user
        LEFT JOIN cities C ON C.id_cities = F.id_cities
        LEFT JOIN countries CO ON C.id_countries = CO.id_countries
        order by F.id_user desc
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a lista de países favoritos dos usuários.`);
    }
  };

  createFavorites = async (userId, cityId, created_at) => {
    try {
      const query = `
        INSERT INTO emissionsApp.favorites (id_user, id_cities, created_at) 
        VALUES ('${userId}', '${cityId}', '${created_at}');
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao associar a cidade ${cityId} ao usuário ${userId} como favorito.`);
    }
  };

  deleteFavorites = async (id) => {
    try {
      const query = `DELETE FROM emissionsApp.favorites WHERE (id_favorites = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao excluir a cidade.`);
    }
  };
}

module.exports = { FavoritesRepository };

const moment = require("moment-timezone");
const { MySqlConnection } = require("../database/mysql");

class UsersRepository {
  getUserByEmail = async (email) => {
    try {
      const query = `SELECT * FROM emissionsApp.users where email like '${email}';`;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o usuário de email ${email}`);
    }
  };

  getUserById = async (id) => {
    try {
      const query = `SELECT id_user as id, name, email, created_at FROM emissionsApp.users where id_user like '${id}';`;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o usuário de ID ${id}`);
    }
  };

  getAllUsers = async () => {
    try {
      const query = `SELECT id_user as id, name, email, created_at FROM emissionsApp.users;`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar todos os usuários.`);
    }
  };

  createUsers = async (name, email) => {
    try {
      const date = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm");

      const query = `INSERT INTO emissionsApp.users (name, email, created_at) VALUES ('${name}', '${email}', '${date}');`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar todos os usuários.`);
    }
  };

  editUsers = async (id, name) => {
    try {
      const query = `UPDATE emissionsApp.users SET name = '${name}' WHERE (id_user = '${id}');`;

      const [response] = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar todos os usuários.`);
    }
  };

  deleteUsers = async (id) => {
    try {
      const query = `DELETE FROM emissionsApp.users WHERE (id_user = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao excluir o usuário.`);
    }
  };
}

//

module.exports = { UsersRepository };

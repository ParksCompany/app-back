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
      const query = `SELECT id_user as id, name, email, isPremium, created_at FROM emissionsApp.users where id_user like '${id}';`;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar o usuário de ID ${id}`);
    }
  };

  getAllUsers = async () => {
    try {
      const query = `SELECT id_user as id, name, email, isPremium, created_at FROM emissionsApp.users;`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar todos os usuários.`);
    }
  };

  createUsers = async (name, email, isPremium) => {
    try {
      const date = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm");

      const query = `INSERT INTO emissionsApp.users (name, email, isPremium, created_at) VALUES ('${name}', '${email}','${isPremium}', '${date}');`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao criar o usuário.`);
    }
  };

  editUsers = async (id, name = null, isPremium = null) => {
    try {
      // Array para os campos a serem atualizados
      const fields = [];

      if (name !== null) fields.push(`name = '${name}'`);
      if (isPremium !== null) fields.push(`isPremium = '${isPremium}'`);

      // Se nenhum campo foi fornecido, não há o que atualizar
      if (fields.length === 0) throw new Error("Nenhum dado para atualizar.");

      const query = `UPDATE emissionsApp.users SET ${fields.join(", ")} WHERE (id_user = '${id}');`;

      const [response] = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao atualizar o usuário.`);
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

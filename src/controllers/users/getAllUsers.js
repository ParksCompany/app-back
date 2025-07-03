const { UsersRepository } = require("../../repositories/users");

class GetAllUsersController {
  async start() {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.getAllUsers();

    return users;
  }
}

module.exports = { GetAllUsersController };

const { UsersRepository } = require("../../repositories/users");

class GetAllUsersController {
  async start() {
    const usersRepository = new UsersRepository();
    let users = await usersRepository.getAllUsers();

    users.map((user) => {
      user.isPremium = user.isPremium === 1 ? true : false;
      return user;
    });

    return { length: users.length, data: users };
  }
}

module.exports = { GetAllUsersController };

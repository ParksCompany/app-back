const { UsersRepository } = require("../../repositories/users");

class DeleteUsersController {
  constructor(id) {
    this.id = id;
  }

  async start() {
    const usersRepository = new UsersRepository();

    //verify if user exists
    const user = await usersRepository.getUserById(this.id);
    if (!user) throw new Error(`O usuário não existe.`);

    await usersRepository.deleteUsers(this.id);

    return user;
  }
}

module.exports = { DeleteUsersController };

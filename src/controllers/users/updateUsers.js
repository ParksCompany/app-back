const { UsersRepository } = require("../../repositories/users");

class UpdateUsersController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async start() {
    const usersRepository = new UsersRepository();

    //verify if user already exists
    const userAlreadyExists = await usersRepository.getUserById(this.id);
    if (!userAlreadyExists) throw new Error(`O usuário não existe.`);

    await usersRepository.editUsers(this.id, this.name);

    userAlreadyExists.name = this.name;
    return userAlreadyExists;
  }
}

module.exports = { UpdateUsersController };

const { UsersRepository } = require("../../repositories/users");

class UpdateUsersController {
  constructor(id, name, isPremium) {
    this.id = id;
    this.name = name;
    this.isPremium = isPremium;
  }

  async start() {
    const usersRepository = new UsersRepository();

    //verify if user already exists
    const userAlreadyExists = await usersRepository.getUserById(this.id);
    if (!userAlreadyExists) throw new Error(`O usuário não existe.`);

    const name = this.name ? this.name : null;
    const isPremium = this.isPremium !== null ? (this.isPremium === true ? 1 : 0) : null;

    await usersRepository.editUsers(this.id, name, isPremium);

    userAlreadyExists.name = name ? name : userAlreadyExists.name;
    userAlreadyExists.isPremium = isPremium !== null ? this.isPremium : userAlreadyExists.isPremium === 1 ? true : false;

    return userAlreadyExists;
  }
}

module.exports = { UpdateUsersController };

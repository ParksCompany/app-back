const { UsersRepository } = require("../../repositories/users");

class CreateUsersController {
  constructor(name, email, isPremium) {
    this.name = name;
    this.email = email;
    this.isPremium = isPremium;
  }

  async start() {
    const usersRepository = new UsersRepository();

    //verify if user already exists
    const userAlreadyExists = await usersRepository.getUserByEmail(this.email);
    if (userAlreadyExists) throw new Error(`O usuário já existe.`);

    await usersRepository.createUsers(this.name, this.email, this.isPremium && this.isPremium === true ? 1 : 0);

    const newUser = usersRepository.getUserByEmail(this.email);
    return newUser;
  }
}

module.exports = { CreateUsersController };

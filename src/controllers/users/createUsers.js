const { UsersRepository } = require("../../repositories/users");

class CreateUsersController {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async start() {
    const usersRepository = new UsersRepository();

    //verify if user already exists
    const userAlreadyExists = await usersRepository.getUserByEmail(this.email);
    if (userAlreadyExists) throw new Error(`O usuário já existe.`);

    await usersRepository.createUsers(this.name, this.email);

    const newUser = usersRepository.getUserByEmail(this.email);
    return newUser;
  }
}

module.exports = { CreateUsersController };

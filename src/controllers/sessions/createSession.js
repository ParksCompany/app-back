const { UsersRepository } = require("../../repositories/users");
const { sign } = require("jsonwebtoken");
const { EXPIRES, SECRET } = require("../../constants/token");

class CreateSessionController {
  constructor(email) {
    this.email = email; // Array
  }

  async start() {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.getUserByEmail(this.email);

    if (!user) throw new Error(`O e-mail não existe`);

    const token = sign({}, SECRET, {
      subject: user.id_user.toString(),
      expiresIn: EXPIRES,
    });

    const id = user.id_user;
    delete user.id_user;

    return {
      id: id,
      ...user,
      token,
    };
  }
}

module.exports = { CreateSessionController };

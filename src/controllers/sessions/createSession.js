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

    const token = sign({}, SECRET, {
      subject: user.id_user.toString(),
      expiresIn: EXPIRES,
    });

    return {
      ...user,
      token,
    };
  }
}

module.exports = { CreateSessionController };

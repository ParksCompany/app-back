const { UsersRepository } = require("../../repositories/users");
const { checkNotAuthentication, checkIfUserIsTheSame } = require("../../helpers/checkRoles");

class GetUserController {
  constructor(id, userAuth) {
    this.id = id;
    this.userAuth = userAuth;
  }

  async start() {
    checkNotAuthentication(this.userAuth);

    const usersRepository = new UsersRepository();
    const user = await usersRepository.getUserById(this.id);
    user.isPremium = user.isPremium === 1 ? true : false;

    if (!user) throw new Error(`O usuário não existe.`);

    if (this.userAuth.role === "admin") return user;

    checkIfUserIsTheSame(this.userAuth, user.id);

    return user;
  }
}

module.exports = { GetUserController };

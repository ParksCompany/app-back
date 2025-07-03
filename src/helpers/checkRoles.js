const { dangerousWords } = require("../constants/utils");

const checkNotAuthentication = (userAuth) => {
  if (userAuth.role === "notAuthenticated") throw new Error(`Você deve estar autenticado para ver essa informação.`);
  return;
};

const checkIfUserIsTheSame = (userAuth, userId) => {
  if (userAuth.role === "user" && Number(userAuth.id) !== Number(userId)) throw new Error(`Você não pode ver dados de um usuário diferente do seu.`);
  return;
};

const checkSQLInjection = (inputs) => {
  for (let input of inputs) {
    const inputText = String(input).toUpperCase();

    for (let word of dangerousWords) {
      if (inputText.includes(word)) {
        throw new Error(`Tentativa de SQL Injection detectada em: "${input}"`);
      }
    }
  }

  return;
};

const checkIfIsIntegerNumber = (input) => {
  if (!/^[+-]?\d+$/.test(input)) throw new Error(`Você deve passar um ID válido`);
  return;
};

module.exports = { checkNotAuthentication, checkIfUserIsTheSame, checkSQLInjection, checkIfIsIntegerNumber };

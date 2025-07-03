const Sequelize = require("sequelize");

const MySqlConnection = new Sequelize({
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_SOCKET,
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : Number(3306),
  dialect: "mysql",
  define: {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
  },
  logging: false,
});

module.exports = { MySqlConnection };

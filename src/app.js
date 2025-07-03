require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");

class AppClass {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());

    this.server.get("/liveness_check", (req, res) => {
      return res.status(200).json({
        message: "API viva.",
      });
    });
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = { AppClass };

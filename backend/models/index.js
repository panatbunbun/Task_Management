const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Task = require("./task")(sequelize, DataTypes);

module.exports = db;

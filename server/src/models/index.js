const sequelize = require("../config/database");

const User = require("./user.model");
const Record = require("./record.model");

// Relations
User.hasMany(Record, { foreignKey: "createdBy" });
Record.belongsTo(User, { foreignKey: "createdBy" });

const db = {
  sequelize,
  User,
  Record,
};

module.exports = db;
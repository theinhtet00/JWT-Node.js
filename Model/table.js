import db from "../resources/database";
import { DataTypes } from "sequelize";

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

db.sync({ logging: false });

module.exports = {
  User,
};

import { DataTypes } from "sequelize";
import database from "../config/database.js";
const Users = database.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: { msg: "Username already exists" },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.TEXT,
  },
});

export default Users;

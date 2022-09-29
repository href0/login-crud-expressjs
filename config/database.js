import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+07:00",
  }
);
export default database;

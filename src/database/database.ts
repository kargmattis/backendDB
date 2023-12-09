import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "productionEnvironment.sqlite",
// });

export const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

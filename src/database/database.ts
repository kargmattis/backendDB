import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "productionEnvironment.sqlite",
// });

export const sequelize = new Sequelize("test_db", "root", "root", {
  host: "localhost", // oder die IP-Adresse des Docker-Containers
  port: 5432,
  dialect: "postgres",
  define: {
    timestamps: false // für das Lesen von Legacy-Tabellen
  }
});

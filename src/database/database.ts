import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

let sequelize: Sequelize;

if (process.env.DATABASE === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "productionEnvironment.sqlite"
  });
} else if (process.env.DATABASE === "postgres") {
  sequelize = new Sequelize("test_db", "root", "root", {
    host: "localhost", // oder die IP-Adresse des Docker-Containers
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: false // für das Lesen von Legacy-Tabellen
    }
  });
}

export { sequelize };

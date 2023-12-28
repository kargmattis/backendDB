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
  let host = "localhost";
  if (process.env.NODE_ENV === "production") {
    host = "db";
  }
  sequelize = new Sequelize("test_db", "root", "root", {
    host: host,
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: false // für das Lesen von Legacy-Tabellen
    },
    logging: false // für das Deaktivieren der SQL-Logs
  });
}

export { sequelize };

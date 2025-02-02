import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

let sequelize: Sequelize;

if (process.env.DATABASE === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "productionEnvironment.sqlite",
    logging: false // für das Deaktivieren der SQL-Logs
  });
} else if (process.env.DATABASE === "postgres") {
  let host = "localhost";
  if (process.env.NODE_ENV === "production") {
    host = "db";
  }
  sequelize = new Sequelize("test_db", "root", "root", {
    host,
    port: 5432,
    dialect: "postgres",
    timezone: "+01:00",
    define: {
      timestamps: false // für das Lesen von Legacy-Tabellen
    }
    // logging: false // für das Deaktivieren der SQL-Logs
  });
}

export { sequelize };

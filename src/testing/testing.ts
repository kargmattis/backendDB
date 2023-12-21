import { sequelize } from "../database/database";
import { fillDatabase } from "./fillDatabase";

console.log("Testing started");

async function testing(): Promise<void> {
  // datenbank connection erröfnen
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("Fill Database started \u2713");

  await fillDatabase();
  // datenbank connection schließen
  // sequelize.close();
  console.log("Testing finished");
}

testing();

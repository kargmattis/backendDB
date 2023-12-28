import { sequelize } from "../database/database";
import { fillDatabase } from "./fillDatabase";
import { putTesting } from "./putTesting";
import { queryDatabaseTesting } from "./queryDatabaseTesting";

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

  const databaseEntries = await fillDatabase();
  if (databaseEntries) {
    putTesting(databaseEntries);
  }
  queryDatabaseTesting();
  console.log("Testing finished");
}

testing();

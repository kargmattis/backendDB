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
  try {
    // database wird gefüllt
    const databaseEntries = await fillDatabase();
    console.log("fillDatabase done");

    if (databaseEntries) {
      await queryDatabaseTesting(databaseEntries);
      console.log("queryDatabaseTesting done");
      await putTesting(databaseEntries);

      console.log("succesfully tested");
    } else {
      console.log("fill Database failed");
    }
    console.log("Testing finished");
  } catch (error) {
    console.log(error);
    console.log("testing failed");
  }
}

testing();

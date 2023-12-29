import express from "express";
import cors from "cors"; // Import the cors middleware
import { type NextFunction, type Request, type Response } from "express";
import { ProduktController } from "./controller/produktController";
import { sequelize } from "./database/database";
import { errorChecking } from "./utilities/errorChecking";
import { KundeController } from "./controller/kundeController";
import { PayPalController } from "./controller/paypalController";
import { AdresseController } from "./controller/adresseController";
import { ZutatController } from "./controller/zutatController";
import { BestellungsController } from "./controller/bestellungscontroller";
import { LastschriftController } from "./controller/lastschriftController";

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

// ... (other middleware and route definitions)

app.use(express.json());
app.use(
  "/api/v1",
  ProduktController,
  ZutatController,
  KundeController,
  PayPalController,
  AdresseController,
  BestellungsController,
  LastschriftController
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// handelt errors die davor nicht abgefangen werden konnten
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  errorChecking(err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

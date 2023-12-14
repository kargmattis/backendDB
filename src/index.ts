import express, { type NextFunction, Request, Response } from "express";
import { ProductController } from "./controller/productController";
import { sequelize } from "./database/database";
import { errorChecking } from "./utilities/errorChecking";
import { KundeController } from "./controller/kundeController";
import { PayPalController } from "./controller/paypalController";
import { AddressController } from "./controller/addressController";

const app = express();
const port = 3000;

// todo auslagern
// eslint-disable-next-line @typescript-eslint/no-floating-promises
sequelize.sync().then(() => {
  // addBestellung(["b4c3ac10-9ab3-11ee-aa5e-6172dcbe40d0"]);
});

// todo ende
app.use(express.json());
app.use(
  "/api/v1",
  ProductController,
  KundeController,
  PayPalController,
  AddressController
);
// handelt errors die davor nicht abgefangen werden konnten
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  errorChecking(err);
});
// testing delete by production
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

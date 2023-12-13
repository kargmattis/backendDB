import express, { type NextFunction, Request, Response } from "express";
import { ProductController } from "./controller/productCotroller";
import { sequelize } from "./database/database";
import { errorChecking } from "./utilities/errorChecking";

const app = express();
const port = 3000;

// todo auslagern
// eslint-disable-next-line @typescript-eslint/no-floating-promises
sequelize.sync();
// todo ende
app.use(express.json());
app.use("/api/v1", ProductController);
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

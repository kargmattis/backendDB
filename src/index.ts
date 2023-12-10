import express from "express";
import { ProductController } from "./controller/productCotroller";
import { sequelize } from "./database/database";

const app = express();
const port = 3000;

app.use(express.json());

// todo auslagern
// eslint-disable-next-line @typescript-eslint/no-floating-promises
sequelize.sync();
// todo ende
app.use("/api/v1", ProductController);

// testing delete by production
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

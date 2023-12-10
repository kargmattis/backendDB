import express from "express";
import { ProductController } from "./controller/productCotroller";
import { sequelize } from "./database/database";
import { createProduct } from "./database/product/createProduct";

const app = express();
const port = 3000;

app.use(express.json());

//todo auslagern
sequelize.sync().then(() => {
  console.log("Database connected");
  createProduct()
    .then(() => console.log("Product created"))
    .catch((error) => console.error(error));
});
//todo ende
app.use("/api/v1", ProductController);

//testing delete by production
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

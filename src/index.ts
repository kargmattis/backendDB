import express from "express";
import { ProductController } from "./controller/productCotroller";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1", ProductController);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

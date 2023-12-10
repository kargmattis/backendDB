import express from "express";
import { createProduct } from "../database/product/createProduct";

export const ProductController = express.Router();

ProductController.get("/product", (req, res) => {
  res.send("Create Get product request");
});

ProductController.post("/product", (req, res) => {
  res.send("Create Post product request");
  createProduct();
});

ProductController.put("/product", (req, res) => {
  res.send("Create Put product request");
});

ProductController.delete("/product", (req, res) => {
  res.send("Delete delete product request");
});

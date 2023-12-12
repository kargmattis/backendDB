import express from "express";
import { createProduct } from "../database/product/operations/createProduct";

export const ProductController = express.Router();

ProductController.get("/product", (_req, res) => {
  res.send("Create Get product request");
});

ProductController.post("/product", async (_req, res) => {
  try {
    await createProduct();
    res.send("Create Post product request");
  } catch (error) {
    // Handle the error appropriately, don't just swallow it.
    console.error(error);
    res.status(500).send("An error occurred while creating the product");
  }
});

ProductController.put("/product", (_req, res) => {
  res.send("Create Put product request");
});

ProductController.delete("/product", (_req, res) => {
  res.send("Delete delete product request");
});

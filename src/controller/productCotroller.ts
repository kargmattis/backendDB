import express from "express";
import { createProduct } from "../database/product/operations/createProduct";
import CustomError from "../utilities/error";

export const ProductController = express.Router();

ProductController.get("/product", (_req, res) => {
  res.send("Create Get product request");
});

ProductController.post("/product", async (_req, res) => {
  createProduct()
    .then((product) => res.status(201).json(product))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ProductController.put("/product", (_req, res) => {
  res.send("Create Put product request");
});

ProductController.delete("/product", (_req, res) => {
  res.send("Delete delete product request");
});

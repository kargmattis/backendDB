import express from "express";

export const ProductController = express.Router();

ProductController.get("/product", (req, res) => {
  res.send("Create Get product request");
});

ProductController.post("/product", (req, res) => {
  res.send("Create Post product request");
});

ProductController.put("/product", (req, res) => {
  res.send("Create Put product request");
});

ProductController.delete("/product", (req, res) => {
  res.send("Delete delete product request");
});

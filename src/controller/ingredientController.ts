import express from "express";
import { createIngredient } from "../database/zutat/operations/createIngredient";
import CustomError from "../utilities/error";

export const IngredientController = express.Router();

IngredientController.get("/ingredient", (_req, res) => {
  res.send("Create Get ingredient request");
});

IngredientController.post("/ingredient", async (_req, res) => {
  createIngredient()
    .then((ingredient) => res.status(201).json(ingredient))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

IngredientController.put("/ingredient", (_req, res) => {
  res.send("Create Put ingredient request");
});

IngredientController.delete("/ingredient", (_req, res) => {
  res.send("Delete delete ingredient request");
});

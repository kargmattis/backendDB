import express from "express";
import { createZutat } from "../database/zutat/operations/createZutat";
import type CustomError from "../utilities/error";
import Zutat from "../database/zutat/zutat";
import { findZutat } from "../database/zutat/operations/findZutat";
import { errorValidation } from "../utilities/errorChecking";

export const ZutatController = express.Router();

ZutatController.get("/zutat", async (_req, res) => {
  try {
    findZutat()
      .then((zutat) => {
        res.status(200).json(zutat);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode).send(CustomError.message);
  }
});

ZutatController.post("/zutat", async (req, res) => {
  try {
    createZutat(req.body)
      .then((zutat) => res.status(201).json(zutat))
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode).send(CustomError.message);
  }
});

ZutatController.put("/zutat", (_req, res) => {
  try {
    res.send("Create Put ingredient request");
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode).send(CustomError.message);
  }
});

ZutatController.delete("/zutat", (_req, res) => {
  try {
    res.send("Delete delete ingredient request");
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode).send(CustomError.message);
  }
});

ZutatController.get("/zutat/:sparte", async (req, res) => {
  try {
    const sparte = req.params.sparte;
    Zutat.findAll({
      where: {
        zutatensparte: sparte
      }
    })
      .then((zutat) => {
        res.status(200).json(zutat);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode || 500).send(error.message);
      });
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode || 500).send(CustomError.message);
  }
});

ZutatController.get("/zutatById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Zutat.findByPk(id)
      .then((zutat) => {
        res.status(200).json(zutat);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode || 500).send(error.message);
      });
  } catch (error) {
    const CustomError = errorValidation(error);
    res.status(CustomError.statusCode || 500).send(CustomError.message);
  }
});

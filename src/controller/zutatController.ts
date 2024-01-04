import express from "express";
import { createZutat } from "../database/zutat/operations/createZutat";
import CustomError from "../utilities/error";
import Zutat from "../database/zutat/zutat";
import { findZutat } from "../database/zutat/operations/findZutat";

export const ZutatController = express.Router();

ZutatController.get("/zutat", async (_req, res) => {
  findZutat()
    .then((zutat) => {
      res.status(200).json(zutat);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ZutatController.post("/zutat", async (req, res) => {
  // ToDo: body sollte noch gecheckt werden wird gerade einfach so übergeben
  createZutat(req.body)
    .then((zutat) => res.status(201).json(zutat))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ZutatController.put("/zutat", (_req, res) => {
  res.send("Create Put ingredient request");
});

ZutatController.delete("/zutat", (_req, res) => {
  res.send("Delete delete ingredient request");
});

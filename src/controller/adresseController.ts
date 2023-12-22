import express from "express";
import type { Request } from "express";
import CustomError from "../utilities/error";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import type { AdresseCreationAttributes } from "../global/types";

export const AdresseController = express.Router();

AdresseController.get("/adresse", async (req: Request, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

AdresseController.post("/adresse", async (req: Request, res) => {
  try {
    const adresseData = req.body as AdresseCreationAttributes;
    const paypal = await createAdresse(adresseData);
    res.status(200).json(paypal);
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

AdresseController.put("/adresse", (_req, res) => {
  res.send("Kunde put request");
});

AdresseController.delete("/adresse", (_req, res) => {
  res.send("Kunde delete request");
});

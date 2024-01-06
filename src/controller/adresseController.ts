import express from "express";
import type { Request } from "express";
import CustomError from "../utilities/error";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import type { AdresseCreationAttributes } from "../global/types";
import { findCurrentAdresse } from "../database/adresse/operation/findAdresse";
import { errorValidation } from "../utilities/errorChecking";

export const AdresseController = express.Router();

AdresseController.get("/adresse/:adressenId", async (req: Request, res) => {
  try {
    const adresse = await findCurrentAdresse(req.params.adressenId);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdresseController.post("/adresse", async (req: Request, res) => {
  try {
    const adresseData = req.body as AdresseCreationAttributes;
    const adresse = await createAdresse(adresseData);
    res.status(200).json(adresse);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdresseController.put("/adresse", (_req, res) => {
  res.send("Kunde put request");
});

AdresseController.delete("/adresse", (_req, res) => {
  res.send("Kunde delete request");
});

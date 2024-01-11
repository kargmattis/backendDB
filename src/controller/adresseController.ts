import express from "express";
import type { Request } from "express";
import CustomError from "../utilities/error";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import type { AdresseCreationAttributes } from "../global/types";
import { findCurrentAdresse } from "../database/adresse/operation/findAdresse";
import { errorValidation } from "../utilities/errorChecking";
import putAdresse from "../database/adresse/operation/putAdresse";
import Adresse from "../database/adresse/adresse";

export const AdresseController = express.Router();

AdresseController.get("/adresse/:kundeId", async (req: Request, res) => {
  try {
    const adresse = await findCurrentAdresse(req.params.kundeId);
    res.status(200).json(adresse);
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

AdresseController.put("/adresse", async (req, res) => {
  await putAdresse(req.body)
    .then((adresse) => {
      res.status(200).json(adresse);
    })
    .catch((error) => {
      const customError = errorValidation(error);
      res.status(customError.statusCode).send(customError.message);
    });
});

AdresseController.delete("/adresse/:kundenId", async (req, res) => {
  try {
    const deletedCount = await Adresse.destroy({
      where: { kundenId: req.params.kundenId }
    });
    console.log(deletedCount);
    if (deletedCount > 0) {
      res.status(200).send("Adresse deleted");
    } else {
      res.status(404).send("Adresse not found");
    }
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

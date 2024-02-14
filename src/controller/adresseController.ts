import express from "express";
import type { Request } from "express";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import type { AdresseCreationAttributes } from "../global/types";
import { findAllAdressen } from "../database/adresse/operation/findAdresse";
import { errorValidation } from "../utilities/errorChecking";
import Adresse from "../database/adresse/adresse";

export const AdresseController = express.Router();

AdresseController.get(
  "/adresse/:kundenId/:laufendeAdressenId",
  async (req: Request, res) => {
    try {
      const kundenId = req.params.kundenId;
      const laufendeAdressenId = req.params.laufendeAdressenId;
      const adresse = await Adresse.findOne({
        where: { kundenId, laufendeAdressenId }
      });
      res.status(200).json(adresse);
    } catch (error) {
      const customError = errorValidation(error);
      res.status(customError.statusCode).send(customError.message);
    }
  }
);

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

AdresseController.get("/adressen/:kundeId", async (req: Request, res) => {
  try {
    const adressen = await findAllAdressen(req.params.kundeId);
    res.status(200).json(adressen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

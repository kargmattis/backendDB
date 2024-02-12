import express, { type Request, type Response } from "express";
import { errorValidation } from "../utilities/errorChecking";
import { createZahlungsmöglichkeit } from "../database/zahlungsmoeglichkeit/operation/createZahlungsmoeglichkeit";
import {
  findActiveZahlungsmöglichkeiten,
  findCurrentZahlungsmöglichkeiten
} from "../database/zahlungsmoeglichkeit/operation/findZahlungsmoeglichkeiten";
import { deactivateZahlungsmöglichkeit } from "../database/zahlungsmoeglichkeit/operation/putZahlungsmöglichkeiten";

export const ZahlungsMöglichkeitenController = express.Router();

ZahlungsMöglichkeitenController.get(
  "/zahlung/:kundenId",
  async (req: Request, res) => {
    try {
      const kundenId = req.params.kundenId;
      const zahlungsInformation = await findActiveZahlungsmöglichkeiten(
        kundenId
      );
      res.status(200).json(zahlungsInformation);
    } catch (error) {
      const err = errorValidation(error);
      res.status(err.statusCode).send(err.message);
    }
  }
);

ZahlungsMöglichkeitenController.post(
  "/zahlung",
  async (req: Request, res: Response) => {
    try {
      const { kundenId, paypalEmail, bankname, bic, iban } = req.body;
      const zahlung = await createZahlungsmöglichkeit({
        kundenId,
        paypalEmail,
        bankname,
        bic,
        iban
      });
      res.status(201).json(zahlung);
    } catch (error) {
      const err = errorValidation(error);
      res.status(err.statusCode).send(err.message);
    }
  }
);

ZahlungsMöglichkeitenController.put("/zahlung", async (req, res) => {
  try {
    const newZahlung = await deactivateZahlungsmöglichkeit(req.body);
    res.status(200).json(newZahlung);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

ZahlungsMöglichkeitenController.delete("/zahlung", (_req, res) => {
  res.send("Kunde delete request");
});

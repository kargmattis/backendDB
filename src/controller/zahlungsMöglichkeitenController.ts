import express, { type Request, type Response } from "express";
import {
  findKunde,
  findKundeByEmail
} from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";
import { ErrorHandle } from "../global/enums";
import { errorValidation } from "../utilities/errorChecking";
import { createZahlungsmöglichkeit } from "../database/zahlungsmoeglichkeit/operation/createZahlungsmoeglichkeit";
import { findCurrentZahlungsmöglichkeiten } from "../database/zahlungsmoeglichkeit/operation/findZahlungsmoeglichkeiten";

export const ZahlungsMöglichkeitenController = express.Router();

ZahlungsMöglichkeitenController.get(
  "/zahlung/:kundenId",
  async (req: Request, res) => {
    try {
      const kundenId = req.params.kundenId;
      const zahlungsInformation = await findCurrentZahlungsmöglichkeiten(
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

ZahlungsMöglichkeitenController.put("/zahlung", (_req, res) => {
  res.send("Kunde put request");
});

ZahlungsMöglichkeitenController.delete("/zahlung", (_req, res) => {
  res.send("Kunde delete request");
});

import express, { type Request } from "express";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import { errorValidation } from "../utilities/errorChecking";
import { placeOrder } from "../database/bestellung/operations/addBestellung";
import CustomError from "../utilities/error";
import { ErrorHandle } from "../global/enums";

export const BestellungsController = express.Router();

BestellungsController.get(
  "/bestellungen/:kundenId",
  async (req: Request, res) => {
    try {
      const kundeId = req.params.kundenId;
      const allBestellungen = await findAllBestellungen(kundeId);
      res.status(200).json(allBestellungen);
    } catch (error) {
      const customError = errorValidation(error);
      res.status(customError.statusCode).send(customError.message);
    }
  }
);

BestellungsController.get(
  "/bestellung/:kundenId",
  async (req: Request, res) => {
    try {
      const kundeId = req.params.kundenId;
      const bestellungen = await findSingleBestellung(kundeId);

      res.status(200).json(bestellungen);
    } catch (error) {
      const customError = errorValidation(error);
      res.status(customError.statusCode).send(customError.message);
    }
  }
);

BestellungsController.post("/bestellung", async (req: Request, res) => {
  try {
    console.log(req.body);

    const {
      kundenId,
      laufendeZahlungsId,
      bestellDatum,
      gewünschtesLieferdatum,
      isPaypal
    } = req.body;
    const bestellungen = await placeOrder({
      kundenId,
      isPaypal,
      laufendeZahlungsId,
      bestellDatum,
      gewünschtesLieferdatum
    });
    res.status(200).json(bestellungen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

BestellungsController.put("/bestellung/:bestellId", (req, res) => {
  try {
    const singleBestellung = findSingleBestellung(req.params.bestellId);
    if (!singleBestellung) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
    }
    res.status(200).json(singleBestellung);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

BestellungsController.delete("/bestellung", (_req, res) => {
  res.send("Bestellung delete request");
});

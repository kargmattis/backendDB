import express, { type Request } from "express";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import { errorValidation } from "../utilities/errorChecking";
import { placeOrder } from "../database/bestellung/operations/addBestellung";
import CustomError from "../utilities/error";
import { ErrorHandle } from "../global/enums";
import Bestellung from "../database/bestellung/bestellung";

export const BestellungsController = express.Router();

BestellungsController.get(
  "/bestellungen/:kundenId",
  async (req: Request, res) => {
    try {
      const kundenId = req.params.kundenId;
      const allBestellungen = await findAllBestellungen(kundenId);
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
      gewünschtesLieferdatum,
      laufendeAdressenId,
      laufendeZahlungsId
    } = req.body;
    const bestellungen = await placeOrder({
      laufendeAdressenId,
      laufendeZahlungsId,
      kundenId,
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

BestellungsController.put(
  "/bestellung/deliver/:bestellId",
  async (req: Request, res) => {
    try {
      const bestellId = req.params.bestellId;
      const deliveredbestellung = await Bestellung.findByPk(bestellId);
      const newDate = new Date();
      if (!deliveredbestellung) {
        throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
      }
      deliveredbestellung.lieferdatum = newDate;
      await deliveredbestellung.save();
      res.status(200).json(deliveredbestellung);
    } catch (error) {
      const err = errorValidation(error);
      res.status(err.statusCode).send(err.message);
    }
  }
);

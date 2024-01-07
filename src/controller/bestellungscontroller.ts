import express, { type Request } from "express";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import { errorValidation } from "../utilities/errorChecking";
import { placeOrder } from "../database/bestellung/operations/addBestellung";

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
    const { kundenId, zahlungsId, bestellDatum, gewünschtesLieferdatum } =
      req.body;
    const bestellungen = await placeOrder({
      kundenId,
      zahlungsId,
      bestellDatum,
      gewünschtesLieferdatum
    });
    res.status(200).json(bestellungen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

BestellungsController.put("/bestellung", (_req, res) => {
  res.send("Bestellung put request");
});

BestellungsController.delete("/bestellung", (_req, res) => {
  res.send("Bestellung delete request");
});

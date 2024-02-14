import express from "express";
import CustomError from "../utilities/error";
import { warenkorbGetHelper } from "./warenkorbHelper/warenkorbHelper";
import { addOrOpenWarenkorbBestellung } from "../database/bestellung/operations/addBestellung";
import { findProduktByPk } from "../database/produkt/operations/findProdukt";
import { errorValidation } from "../utilities/errorChecking";
import {
  putOrPostWarenkorb,
  putWarenkorb
} from "../database/bestellung/operations/putBestellung";
import Bestellungposition from "../database/bestellungsPosition/bestellungsPosition";
import { findWarenkorb } from "../database/bestellung/operations/findBestellung";

export const WarenkorbController = express.Router();

WarenkorbController.get("/warenkorb/:kundenId", async (req, res) => {
  if (!req.params.kundenId) {
    res.status(400).send("KundenId not found");
  }
  try {
    const warenkorb = await warenkorbGetHelper(req.params.kundenId);
    res.status(200).json(warenkorb);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Ein Fehler ist aufgetreten!");
    }
  }
});

WarenkorbController.post("/warenkorb", async (req, res) => {
  try {
    console.log(req.body);

    const warenkorb = await putOrPostWarenkorb(req.body);
    const produkt = await findProduktByPk(warenkorb.produktId);
    const bestellmenge = warenkorb.bestellmenge;
    res.status(200).send({ produkt, bestellmenge });
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

WarenkorbController.put("/warenkorb", async (req, res) => {
  try {
    const addWarenkorb = await putWarenkorb(req.body);
    const produkt = await findProduktByPk(addWarenkorb.produktId);
    const bestellmenge = addWarenkorb.bestellmenge;
    res.status(200).send({ produkt, bestellmenge });
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

WarenkorbController.delete("/warenkorb/:kundenId", async (req, res) => {
  try {
    const warenkorb = await findWarenkorb(req.params.kundenId);
    const bestellpositionen = await Bestellungposition.destroy({
      where: {
        bestellungsId: warenkorb.bestellungsId
      }
    });

    const bestellung = await warenkorb.destroy();
    res.status(200).send({ bestellung, bestellpositionen });
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});
WarenkorbController.delete(
  "/warenkorb/:kundenId/:produktId",
  async (req, res) => {
    try {
      console.log(req.params.kundenId, "kundenId");
      console.log(req.params.produktId, "produktId");

      const warenkorb = await findWarenkorb(req.params.kundenId);
      const bestellpositionen = await Bestellungposition.destroy({
        where: {
          bestellungsId: warenkorb.bestellungsId,
          produktId: req.params.produktId
        }
      });

      // const bestellung = await warenkorb.destroy();
      res.status(200).send({ bestellpositionen });
    } catch (error) {
      const customError = errorValidation(error);
      res.status(customError.statusCode).send(customError.message);
    }
  }
);

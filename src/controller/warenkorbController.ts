import express from "express";
import CustomError from "../utilities/error";
import { warenkorbGetHelper } from "./warenkorbHelper/warenkorbHelper";

export const WarenkorbController = express.Router();

WarenkorbController.get("/warenkorb/:kundenId", async (req, res) => {
  if (!req.params.kundenId) {
    res.status(400).send("KundenId not found");
  }
  try {
    const warenkorb = await warenkorbGetHelper(req.params.kundenId);
    // const bestellung = await findSingleBestellung(warenkorb.bestellungsId);
    res.status(200).json(warenkorb);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Ein Fehler ist aufgetreten!");
    }
  }
});

// WarenkorbController.post("/warenkorb", async (req, res) => {
//   createProdukt(req.body)
//     .then((produkt) => res.status(201).json(produkt))
//     .catch((error: CustomError) => {
//       res.status(error.statusCode).send(error.message);
//     });
// });

// WarenkorbController.get("/warenkorb", (_req, res) => {
//   findProductWithoutKundeId()
//     .then((produkt) => {
//       res.status(200).json(produkt);
//     })
//     .catch((error: CustomError) => {
//       res.status(error.statusCode).send(error.message);
//     });
// });

// WarenkorbController.put("/warenkorb", (_req, res) => {
//   res.send("Create Put product request");
// });

// WarenkorbController.delete("/warenkorb", (_req, res) => {
//   res.send("Delete delete product request");
// });

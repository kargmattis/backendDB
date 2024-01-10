import express from "express";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import type CustomError from "../utilities/error";
import {
  findProductWithoutKundeId,
  findProduktByKundeId,
  findProduktByPk
} from "../database/produkt/operations/findProdukt";

export const ProduktController = express.Router();

ProduktController.get("/produkt", (_req, res) => {
  res.send("Create Get product request");
});

ProduktController.post("/produkt", async (req, res) => {
  // ToDo: body sollte noch gecheckt werden wird gerade einfach so übergeben
  createProdukt(req.body)
    .then((produkt) => res.status(201).json(produkt))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});
ProduktController.get("/generalProdukts", (_req, res) => {
  findProductWithoutKundeId()
    .then((produkt) => {
      res.status(200).json(produkt);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ProduktController.get("/CusomerProdukts/:id", (_req, res) => {
  const { id } = _req.params;
  findProduktByKundeId(id)
    .then((produkt) => {
      res.status(200).json(produkt);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ProduktController.put("/produkt", (_req, res) => {
  res.send("Create Put product request");
});

ProduktController.delete("/produkt", (_req, res) => {
  res.send("Delete delete product request");
});

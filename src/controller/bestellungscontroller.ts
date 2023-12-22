import express, { type Request } from "express";
import CustomError from "../utilities/error";
import { createAdresse } from "../database/adresse/operation/createAdresse";

export const BestellungsController = express.Router();

BestellungsController.get("/bestellung", async (req: Request, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

BestellungsController.post("/bestellung", async (req: Request, res) => {
  // TODO: need to implement bestellung
  console.log(req.body);
  const paypal = await createAdresse(req.body)
    .then((paypal) => res.status(200).json(paypal))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
  console.log(paypal);
});

BestellungsController.put("/bestellung", (_req, res) => {
  res.send("Bestellung put request");
});

BestellungsController.delete("/bestellung", (_req, res) => {
  res.send("Bestellung delete request");
});

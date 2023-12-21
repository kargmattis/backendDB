import express, { Request } from "express";
import CustomError from "../utilities/error";
import { createAdresse } from "../database/adresse/operation/addAdresse";

export const AdresseController = express.Router();

AdresseController.get("/adresse", async (req, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

AdresseController.post("/adresse", async (req: Request, res) => {
  const paypal = await createAdresse(req.body)
    .then((paypal) => res.status(200).json(paypal))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
  console.log(paypal);
});

AdresseController.put("/adresse", (_req, res) => {
  res.send("Kunde put request");
});

AdresseController.delete("/adresse", (_req, res) => {
  res.send("Kunde delete request");
});

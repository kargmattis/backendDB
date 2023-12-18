import express, { Request } from "express";
import CustomError from "../utilities/error";
import { createAdress } from "../database/adresse/operation/addAdress";

export const BestellungsController = express.Router();

BestellungsController.get("/bestellung", async (req, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

BestellungsController.post("/bestellung", async (req: Request, res) => {
  console.log(req.body);
  const paypal = await createAdress(req.body)
    .then((paypal) => res.status(200).json(paypal))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
  console.log(paypal);
});

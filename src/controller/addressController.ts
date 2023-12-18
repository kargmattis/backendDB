import express, { Request } from "express";
import CustomError from "../utilities/error";
import { createAdress } from "../database/adresse/operation/addAdress";

export const AddressController = express.Router();

AddressController.get("/addresse", async (req, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

AddressController.post("/addresse", async (req: Request, res) => {
  const paypal = await createAdress(req.body)
    .then((paypal) => res.status(200).json(paypal))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
  console.log(paypal);
});

import express, { Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";

export const KundeController = express.Router();

KundeController.get("/kunde/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const kunde = await findKunde(id);
    res.json(kunde);
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

KundeController.post("/kunde", async (req: Request, res) => {
  postRequestKunde(req)
    .then((kunde) => res.status(201).json(kunde))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

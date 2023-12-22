import express, { type Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";

export const KundeController = express.Router();

KundeController.get("/kunde", async (req: Request, res) => {
  try {
    const id = req.query.id;
    const email = req.query.email;

    const kunde = await findKunde(id as string)
      .then((kunde) => res.status(200).json(kunde))
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
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

KundeController.put("/kunde", (_req, res) => {
  res.send("Kunde put request");
});

KundeController.delete("/kunde", (_req, res) => {
  res.send("Kunde delete request");
});

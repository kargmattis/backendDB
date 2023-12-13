import express, { Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";

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
  try {
    const kunde = postRequestKunde(req);
    res.json(kunde);
  } catch (error) {
    // Handle the error appropriately, don't just swallow it.
    console.error(error);
    res.status(500).send("An error occurred while creating the product");
  }
});

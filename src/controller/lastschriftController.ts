import express, { Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";
import { createLastschriftRecord } from "../database/zahlungsmoeglichkeit/operation/addLastschrift";

export const LastschriftController = express.Router();

LastschriftController.get("/lastschrift", async (_req, res) => {
  try {
    res.json("TODO need to implement");
  } catch (error) {
    res.status(500).send("An error occurred while fetching lastschrift");
  }
});

LastschriftController.post("/lastschrift", async (req: Request, res) => {
  console.log("lastschrift post request");

  try {
    const kundenId = req.body.kundenId;
    const bankname = req.body.bankname;
    const bic = req.body.bic;
    const iban = req.body.iban;

    if (!kundenId || !bankname || !bic || !iban) {
      console.log(kundenId, bankname, bic, iban);

      res.status(400).send("Missing required parameters");
      return;
    }

    const lastschrift = await createLastschriftRecord({
      kundenId,
      bankname,
      bic,
      iban
    })
      .then((lastschrift) => res.status(200).json(lastschrift))
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    res.status(500).send("An error occurred while creating the lastschrift");
  }
});

LastschriftController.put("/lastschrift", (_req, res) => {
  res.send("Lastschrift put request");
});

LastschriftController.delete("/lastschrift", (_req, res) => {
  res.send("Lastschrift delete request");
});
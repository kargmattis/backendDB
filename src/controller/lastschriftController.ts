import express, { type Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";
import { createLastschriftRecord } from "../database/zahlungsmoeglichkeit/operation/addLastschrift";
import findLastschriftByZahlungsId from "../database/zahlungsmoeglichkeit/operation/findLastschrift";
import putLastschrift from "../database/zahlungsmoeglichkeit/operation/putLastschrift";
import Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
export const LastschriftController = express.Router();

LastschriftController.get("/lastschrift/:zahlungsId", async (req, res) => {
  console.log("lastschrift get request");

  try {
    const zahlungsId = req.params.zahlungsId;

    if (!zahlungsId) {
      res.status(400).send("Missing required parameters");
      return;
    }

    const lastschrift = await findLastschriftByZahlungsId(zahlungsId)
      .then((lastschrift) => res.status(200).json(lastschrift))
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    res.status(500).send("An error occurred while fetching the lastschrift");
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

LastschriftController.put("/lastschrift/:zahlungsId", async (req, res) => {
  console.log("lastschrift put request");
  try {
    const zahlungsId = req.params.zahlungsId;
    const updatedData = {
      kundenId: req.body.kundenId,
      bankname: req.body.bankname,
      bic: req.body.bic,
      iban: req.body.iban
      // Add other fields as needed
    };

    const updatedLastschriftRecord = await putLastschrift(
      zahlungsId,
      updatedData
    );

    if (updatedLastschriftRecord) {
      res.status(200).json(updatedLastschriftRecord.toJSON());
    } else {
      res.status(404).send("Lastschrift record not found");
    }
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send(error.message);
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .send("An error occurred while updating the Lastschrfit record");
    }
  }
});

LastschriftController.delete("/lastschrift", (_req, res) => {
  res.send("Lastschrift delete request");
});

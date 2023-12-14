import express, { Request } from "express";
import { findKunde } from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import CustomError from "../utilities/error";
import { createPaypalRecord } from "../database/zahlungsmöglichkeit/operation/addPaypal";

export const PayPalController = express.Router();

PayPalController.get("/paypal", async (req, res) => {
  try {
    res.json("TODO need to implememt");
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

PayPalController.post("/paypal", async (req: Request, res) => {
  console.log("paypal post request");

  try {
    const kundenId = req.body.kundenId;
    const email = req.body.email;
    console.log(req.body);

    if (!kundenId || !email) {
      console.log(kundenId, email);

      res.status(400).send("Missing query parameters");
      return;
    }
    const paypal = await createPaypalRecord({ kundenId, email })
      .then((paypal) => res.status(200).json(paypal))
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
  } catch (error) {
    res.status(500).send("An error occurred while creating the product");
  }
});

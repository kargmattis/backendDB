import express, { Request, Response } from "express";
import CustomError from "../utilities/error";
import { createPaypalRecord } from "../database/zahlungsmoeglichkeit/operation/addPaypal";
import findPaypal from "../database/zahlungsmoeglichkeit/operation/findPaypal";
import putPaypal from "../database/zahlungsmoeglichkeit/operation/putPaypal";

export const PayPalController = express.Router();

PayPalController.get("/paypal", async (_req, res) => {
  findPaypal()
    .then((paypal) => {
      res.status(200).json(paypal);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

PayPalController.post("/paypal", async (req: Request, res: Response) => {
  console.log("paypal post request");

  try {
    const kundenId = req.body.kundenId;
    const email = req.body.email;

    if (!kundenId || !email) {
      res.status(400).send("Missing query parameters");
      return;
    }

    const paypal = await createPaypalRecord({ kundenId, email });
    res.status(200).json(paypal);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send(error.message);
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .send("An error occurred while creating the Paypal record");
    }
  }
});

PayPalController.put(
  "/paypal/:zahlungsId",
  async (req: Request, res: Response) => {
    try {
      const zahlungsId = req.params.zahlungsId;
      const updatedData = {
        kundenId: req.body.kundenId,
        email: req.body.email
        // Add other fields as needed
      };

      if (!zahlungsId || !updatedData.kundenId || !updatedData.email) {
        res.status(400).send("Missing required parameters");
        return;
      }

      const updatedPaypalRecord = await putPaypal(zahlungsId, updatedData);

      if (updatedPaypalRecord) {
        res.status(200).json(updatedPaypalRecord.toJSON());
      } else {
        res.status(404).send("Paypal record not found");
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else {
        console.error("Error:", error);
        res
          .status(500)
          .send("An error occurred while updating the Paypal record");
      }
    }
  }
);

PayPalController.delete("/paypal", (_req, res) => {
  res.send("Paypal delete request");
});

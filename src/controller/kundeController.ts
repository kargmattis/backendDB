import express, { type Request, type Response } from "express";
import {
  findKunde,
  findKundeByEmail
} from "../database/kunde/operation/findKunde";
import { postRequestKunde } from "./kundeHelper/postRequestKunde";
import type CustomError from "../utilities/error";

export const KundeController = express.Router();

KundeController.get("/kunde", async (req: Request, res) => {
  try {
    const id = req.query.id;
    const email = req.query.email;

    const kunde = await findKunde(id as string)
      .then((kunde) => {
        res.status(200).json(kunde);
      })
      .catch((error: CustomError) => {
        res.status(error.statusCode).send(error.message);
      });
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

KundeController.post("/kunde/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Suche den Benutzer in der Datenbank
  const kunde = await findKundeByEmail(email);

  if (!kunde) {
    // Wenn der Benutzer nicht gefunden wurde, sende einen Fehler zurück
    res.status(404).json({ error: "User not found" });
  } else {
    // Wenn der Benutzer gefunden wurde, überprüfe das Passwort
    if (password === kunde.passwort) {
      // Wenn das Passwort übereinstimmt, sende eine Erfolgsmeldung zurück
      res.status(200).json({ message: "Successful login" });
    } else {
      // Wenn das Passwort nicht übereinstimmt, sende einen Fehler zurück
      res.status(401).json({ error: "Incorrect password" });
    }
  }
});

KundeController.put("/kunde", (_req, res) => {
  res.send("Kunde put request");
});

KundeController.delete("/kunde", (_req, res) => {
  res.send("Kunde delete request");
});

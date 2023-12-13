import Kunde from "../../database/kunde/kunde";
import { createKunde } from "../../database/kunde/operation/createKunde";
import { Request } from "express";
export const postRequestKunde = async (req: Request): Promise<Kunde> => {
  const {
    email,
    vorname,
    nachname,
    passwort,
    telefonnummer,
    zeitungsaboablaufdatum
  } = req.body;
  if (
    !email ||
    !vorname ||
    !nachname ||
    !passwort ||
    !telefonnummer ||
    !zeitungsaboablaufdatum
  ) {
    // TODO Auslagern
    throw new Error("Missing input!");
  }
  const createdKunde = await createKunde({
    email,
    passwort,
    vorname,
    nachname,
    telefonnummer,
    zeitungsaboablaufdatum
  });
  return createdKunde;
};

const inputCheckPost = (req: Request): void => {
  // TODO implement fchecking an throw error
};

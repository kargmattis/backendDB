import Kunde from "../../database/kunde/kunde";
import { createKunde } from "../../database/kunde/operation/createKunde";
import { Request } from "express";
import CustomError from "../../utilities/error";
import { ErrorHandle } from "../../global/enums";

export const postRequestKunde = async (req: Request): Promise<Kunde> => {
  const {
    email,
    vorname,
    nachname,
    passwort,
    telefonnummer,
    zeitungsaboablaufdatum
  } = req.body;

  let missingAttribute: Array<string> = [];
  if (!email) missingAttribute.push("email");
  if (!vorname) missingAttribute.push("vorname");
  if (!nachname) missingAttribute.push("nachname");
  if (!passwort) missingAttribute.push("passwort");
  if (!telefonnummer) missingAttribute.push("telefonnummer");
  if (!zeitungsaboablaufdatum) missingAttribute.push("zeitungsaboablaufdatum");
  if (missingAttribute.length > 0) {
    throw new CustomError(ErrorHandle.BadRequest, missingAttribute.toString());
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

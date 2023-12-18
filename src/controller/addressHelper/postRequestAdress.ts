import { Request } from "express";
import CustomError from "../../utilities/error";
import { ErrorHandle } from "../../global/enums";
import Adresse from "../../database/adresse/addresse";
import { createAdress } from "../../database/adresse/operation/addAdress";

export const postRequestAdresse = async (req: Request): Promise<Adresse> => {
  const {
    kundenId,
    postleitzahl,
    isthauptadresse,
    straße,
    hausnummer,
    ort,
    hausnummerzusatz
  } = req.body;

  let missingAttribute: Array<string> = [];
  if (!kundenId) missingAttribute.push("kundenId");
  if (!postleitzahl) missingAttribute.push("postleitzahl");
  if (!isthauptadresse) missingAttribute.push("isthauptadresse");
  if (!straße) missingAttribute.push("straße");
  if (!hausnummer) missingAttribute.push("hausnummer");
  if (!ort) missingAttribute.push("zeitungsaboablaufdatum");
  if (!hausnummerzusatz) missingAttribute.push("hausnummerzusatz");
  if (missingAttribute.length > 0) {
    throw new CustomError(ErrorHandle.BadRequest, missingAttribute.toString());
  }
  const createdAdress = await createAdress({
    kundenId,
    postleitzahl,
    isthauptadresse,
    straße,
    hausnummer,
    ort,
    hausnummerzusatz
  });
  return createdAdress;
};

import type { Request } from "express";
import CustomError from "../../utilities/error";
import { ErrorHandle } from "../../global/enums";
import type Adresse from "../../database/adresse/adresse";
import { createAdresse } from "../../database/adresse/operation/createAdresse";

export const postRequestAdresse = async (req: Request): Promise<Adresse> => {
  const { kundenId, postleitzahl, strasse, hausnummer, ort, hausnummerzusatz } =
    req.body;

  const missingAttribute: string[] = [];
  if (!kundenId) missingAttribute.push("kundenId");
  if (!postleitzahl) missingAttribute.push("postleitzahl");
  if (!strasse) missingAttribute.push("straße");
  if (!hausnummer) missingAttribute.push("hausnummer");
  if (!ort) missingAttribute.push("zeitungsaboablaufdatum");
  if (!hausnummerzusatz) missingAttribute.push("hausnummerzusatz");
  if (missingAttribute.length > 0) {
    throw new CustomError(ErrorHandle.BadRequest, missingAttribute.toString());
  }
  const createdAdresse = await createAdresse({
    kundenId,
    postleitzahl,
    strasse,
    hausnummer,
    ort,
    hausnummerzusatz
  });
  return createdAdresse;
};

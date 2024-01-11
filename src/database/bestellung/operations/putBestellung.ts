import { addOrOpenWarenkorbBestellungCreationAttributes } from "./../../../global/types";
import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import {
  addOrOpenWarenkorbBestellung,
  getBestellungsId
} from "./addBestellung";

export async function putWarenkorb(
  bestellungAdding: addOrOpenWarenkorbBestellungCreationAttributes
): Promise<Bestellungposition> {
  try {
    const bestellungsId = await getBestellungsId(bestellungAdding.kundenId);
    const bestellungsPostion = await Bestellungposition.findOne({
      where: {
        bestellungsId: bestellungsId,
        produktId: bestellungAdding.produktId
      }
    });
    if (!bestellungsPostion) {
      throw new CustomError(
        ErrorHandle.NotFound,
        "BestellungsPosition not found"
      );
    }
    if (bestellungsPostion) {
      bestellungsPostion.bestellmenge += bestellungAdding.produktMenge;
      await bestellungsPostion.save();
      return bestellungsPostion;
    }
    throw new CustomError(
      ErrorHandle.DatabaseError,
      "BestellungsPosition error"
    );
  } catch (error) {
    throw errorChecking(error);
  }
}

export async function putOrPostWarenkorb(
  bestellungAdding: addOrOpenWarenkorbBestellungCreationAttributes
): Promise<Bestellungposition> {
  try {
    console.log("in put or post");

    const bestellungsId = await getBestellungsId(bestellungAdding.kundenId);
    const findWarenkorb = await Bestellungposition.findOne({
      where: {
        bestellungsId: bestellungsId,
        produktId: bestellungAdding.produktId
      }
    });

    if (findWarenkorb) {
      console.log("findWarenkorb", findWarenkorb.dataValues);
      console.log("bestellungAdding", bestellungAdding.produktMenge);
      findWarenkorb.bestellmenge += bestellungAdding.produktMenge;
      await findWarenkorb.save();
      return findWarenkorb;
    }
    if (!findWarenkorb) {
      const Warenkorb = await addOrOpenWarenkorbBestellung(bestellungAdding);
      if (!Warenkorb) {
        throw new CustomError(
          ErrorHandle.DatabaseError,
          "BestellungsPosition error"
        );
      }
      return Warenkorb;
    }
    throw new CustomError(ErrorHandle.ServerError, "BestellungsPosition");
  } catch (error) {
    throw errorChecking(error);
  }
}

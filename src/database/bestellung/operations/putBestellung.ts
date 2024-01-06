import { ErrorHandle } from "../../../global/enums";
import { addOrOpenWarenkorbBestellungCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import { getBestellungsId } from "./addBestellung";

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

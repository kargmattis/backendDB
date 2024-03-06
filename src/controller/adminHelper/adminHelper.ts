import Bestellung from "../../database/bestellung/bestellung";
import { findSingleBestellung } from "../../database/bestellung/operations/findBestellung";
import Kunde from "../../database/kunde/kunde";
import { findKunde } from "../../database/kunde/operation/findKunde";
import { ErrorHandle } from "../../global/enums";
import CustomError from "../../utilities/error";
import { errorChecking } from "../../utilities/errorChecking";

export async function checkAdmin(kundenId: string): Promise<boolean> {
  try {
    const kunde = await Kunde.findByPk(kundenId);
    console.log(kundenId);
    console.log(kunde);

    if (kunde?.dataValues.istAdmin === true) {
      return true;
    } else if (kunde?.dataValues.istAdmin === false) {
      throw new CustomError(ErrorHandle.Unauthorized, "You are not an admin");
    } else {
      throw new CustomError(ErrorHandle.NotFound, "User not found");
    }
  } catch (error) {
    throw errorChecking(error);
  }
}

export async function findBestellungDependencies(
  bestellung: Bestellung
): Promise<any> {
  try {
    const partlyBestellung = await findSingleBestellung(
      bestellung.bestellungsId
    );

    const bestellungsKunde = await findKunde(bestellung.kundenId);

    if (bestellungsKunde) {
      return { kunde: bestellungsKunde.dataValues, ...partlyBestellung };
    } else {
      throw new CustomError(
        ErrorHandle.NotFound,
        "Bestellungsdependencies not found"
      );
    }
  } catch (error) {
    throw errorChecking(error);
  }
}

import {
  ZahlungsmöglichkeitenCreationAttributes,
  ZahlungsmöglichkeitenDeactivate
} from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";
import {
  findActiveZahlungsmöglichkeiten,
  findCurrentZahlungsmöglichkeiten,
  findZahlungsmöglichkeitByPKs
} from "./findZahlungsmoeglichkeiten";

export async function deactivateZahlungsmöglichkeit(
  pkInput: ZahlungsmöglichkeitenDeactivate
) {
  try {
    const zahlungsmöglichkeit = await findZahlungsmöglichkeitByPKs(pkInput);
    if (!zahlungsmöglichkeit) {
      throw new Error("Zahlungsmöglichkeit not found");
    }
    const deactivatedZahlungsmöglichkeit = await zahlungsmöglichkeit.update({
      aktiv: false
    });

    return deactivatedZahlungsmöglichkeit;
  } catch (error) {
    throw errorChecking(error);
  }
}

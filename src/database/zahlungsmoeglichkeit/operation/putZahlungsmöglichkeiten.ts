import { ZahlungsmöglichkeitenCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";
import { findCurrentZahlungsmöglichkeiten } from "./findZahlungsmoeglichkeiten";

export async function putZahlungsmöglichkeiten(
  putZahlungsData: ZahlungsmöglichkeitenCreationAttributes
) {
  try {
    const currentZahlungsmöglichkeiten = await findCurrentZahlungsmöglichkeiten(
      putZahlungsData.kundenId
    );
    const updatetZahlungsmöglichkeitId =
      await currentZahlungsmöglichkeiten.increment("laufendeZahlungsId");
    const newZahlungsMoeglichkeitenObject = {
      ...currentZahlungsmöglichkeiten,
      putZahlungsData,
      laufendeZahlungsId: updatetZahlungsmöglichkeitId
    };
    const newZahlungsMoeglichkeiten = await ZahlungsMoeglichkeiten.create({
      newZahlungsMoeglichkeitenObject
    });
    return newZahlungsMoeglichkeiten;
  } catch (error) {
    throw errorChecking(error);
  }
}

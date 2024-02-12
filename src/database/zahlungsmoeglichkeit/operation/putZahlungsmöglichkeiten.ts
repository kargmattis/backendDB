import { ZahlungsmöglichkeitenCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";
import { findCurrentZahlungsmöglichkeiten } from "./findZahlungsmoeglichkeiten";

export async function putZahlungsmöglichkeiten(
  putZahlungsData: ZahlungsmöglichkeitenCreationAttributes
) {
  // try {
  //   console.log("in function", putZahlungsData);
  //   const currentZahlungsmöglichkeiten = await findCurrentZahlungsmöglichkeiten(
  //     putZahlungsData.kundenId
  //   );
  //   const updatetZahlungsmöglichkeitId =
  //     currentZahlungsmöglichkeiten.laufendeZahlungsId + 1;
  //   const newZahlungsMoeglichkeitenObjekt = {
  //     ...putZahlungsData,
  //     laufendeZahlungsId: updatetZahlungsmöglichkeitId
  //   };
  //   console.log(newZahlungsMoeglichkeitenObjekt);
  //   const newZahlungsMoeglichkeiten = await ZahlungsMoeglichkeiten.create(
  //     newZahlungsMoeglichkeitenObjekt
  //   );
  //   return newZahlungsMoeglichkeiten;
  // } catch (error) {
  //   throw errorChecking(error);
  // }
}

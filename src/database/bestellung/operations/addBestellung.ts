import type {
  PlaceOrderApiAttributes,
  addOrOpenWarenkorbBestellungCreationAttributes
} from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../../adresse/adresse";
import { findCurrentAdresse } from "../../adresse/operation/findAdresse";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import Bestellung from "../bestellung";
import { findWarenkorb } from "./findBestellung";

export async function addOrOpenWarenkorbBestellung(
  bestellungCreation: addOrOpenWarenkorbBestellungCreationAttributes
): Promise<Bestellungposition> {
  try {
    const bestellungsId = await getBestellungsId(bestellungCreation.kundenId);

    const newBestellung = Bestellungposition.create({
      bestellungsId: bestellungsId,
      produktId: bestellungCreation.produktId,
      bestellmenge: bestellungCreation.produktMenge
    });

    return newBestellung;
  } catch (error) {
    console.log("error ist here", error);
    throw error;
  }
}

export async function getBestellungsId(kundenId: string): Promise<string> {
  try {
    const bestellung = await Bestellung.findOne({
      where: { kundenId: kundenId, zahlungsId: null }
    });
    if (bestellung) {
      return bestellung.bestellungsId;
    }

    const currentAdresse = await findCurrentAdresse(kundenId);
    const laufendeAdressenId = currentAdresse.laufendeAdressenId;
    const newNestellung = await Bestellung.create({
      kundenId: kundenId,
      laufendeAdressenId: laufendeAdressenId
    });
    return newNestellung.bestellungsId;
  } catch (error) {
    console.log("error ist here");

    throw errorChecking(error);
  }
}

export async function placeOrder(orderData: PlaceOrderApiAttributes) {
  try {
    const warenkorb = await findWarenkorb(orderData.kundenId);
    const orderedBestellung = await warenkorb.update({
      zahlungsId: orderData.zahlungsId,
      kundenId: orderData.kundenId,
      bestellDatum: orderData.bestellDatum,
      gewünschtesLieferdatum: orderData.gewünschtesLieferdatum
    });
    return orderedBestellung;
  } catch (error) {
    throw errorChecking(error);
  }
}

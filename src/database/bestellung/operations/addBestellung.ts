import type {
  PlaceOrderApiAttributes,
  addOrOpenWarenkorbBestellungCreationAttributes
} from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import Bestellung from "../bestellung";
import { findWarenkorb } from "./findBestellung";

export async function addOrOpenWarenkorbBestellung(
  bestellungCreation: addOrOpenWarenkorbBestellungCreationAttributes
): Promise<Bestellungposition> {
  try {
    const bestellungsId = await getBestellungsId(
      bestellungCreation.kundenId,
      bestellungCreation.laufendeAdressenId
    );
    console.log("bestellungsId", bestellungsId);

    const newBestellung = Bestellungposition.create({
      bestellungsId,
      produktId: bestellungCreation.produktId,
      bestellmenge: bestellungCreation.produktMenge
    });

    return await newBestellung;
  } catch (error) {
    console.log("error ist here", error);
    throw error;
  }
}

export async function getBestellungsId(
  kundenId: string,
  laufendeAdressenId: number
): Promise<string> {
  try {
    const bestellung = await Bestellung.findOne({
      where: { kundenId, laufendeZahlungsId: null }
    });
    // console.log("bestellung", bestellung);
    if (bestellung) {
      return bestellung.bestellungsId;
    }
    const newNestellung = await Bestellung.create({
      kundenId,
      laufendeAdressenId
    });
    console.log("newNestellung", newNestellung);

    return newNestellung.bestellungsId;
  } catch (error) {
    console.log("error ist here");

    throw errorChecking(error);
  }
}

export async function placeOrder(orderData: PlaceOrderApiAttributes) {
  try {
    const warenkorb = await findWarenkorb(orderData.kundenId);
    const date = new Date();

    console.log("laufendeZahlungsId", orderData);
    const orderedBestellung = await warenkorb.update({
      ...warenkorb.dataValues,
      laufendeZahlungsId: orderData.laufendeZahlungsId,
      kundenId: orderData.kundenId,
      laufendeAdressenId: orderData.laufendeAdressenId,
      bestellDatum: date,
      gewünschtesLieferdatum: orderData.gewünschtesLieferdatum
    });
    return orderedBestellung;
  } catch (error) {
    throw errorChecking(error);
  }
}

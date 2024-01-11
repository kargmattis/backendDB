import type {
  PlaceOrderApiAttributes,
  PlaceOrderCreationAttributes,
  addOrOpenWarenkorbBestellungCreationAttributes
} from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../../adresse/adresse";
import {
  findAdressIdByKundenId,
  findCurrentAdresse
} from "../../adresse/operation/findAdresse";
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
    const adressen = await Adresse.findAll({ where: { kundenId } });
    for (const adresse of adressen) {
      const bestellung = await Bestellung.findOne({
        where: { adressenId: adresse.adressenId, zahlungsId: null }
      });
      if (bestellung) {
        return bestellung.bestellungsId;
      }
    }
    const currentAdresse = await findCurrentAdresse(adressen[0].adressenId);
    const adressenId = currentAdresse.adressenId;
    const laufendeAdressenId = currentAdresse.laufendeAdressenId;
    console.log(adressenId, laufendeAdressenId);

    const bestellung = await Bestellung.create({
      adressenId: adressenId,
      laufendeAdressenId: laufendeAdressenId
    });
    return bestellung.bestellungsId;
  } catch (error) {
    console.log("error ist here");

    throw errorChecking(error);
  }
}

export async function placeOrder(orderData: PlaceOrderApiAttributes) {
  try {
    const warenkorb = await findWarenkorb(orderData.kundenId);
    const adressId = await findAdressIdByKundenId(orderData.kundenId);
    const currentAdresse = await findCurrentAdresse(adressId);
    const orderedBestellung = await warenkorb.update({
      zahlungsId: orderData.zahlungsId,
      adressenId: currentAdresse.adressenId,
      bestellDatum: orderData.bestellDatum,
      gewünschtesLieferdatum: orderData.gewünschtesLieferdatum
    });
    return orderedBestellung;
  } catch (error) {
    throw errorChecking(error);
  }
}

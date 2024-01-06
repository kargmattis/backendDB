import type {
  PlaceOrderCreationAttributes,
  addOrOpenWarenkorbBestellungCreationAttributes
} from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../../adresse/adresse";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import Bestellung from "../bestellung";
import { findWarenkorb } from "./findBestellung";

export async function addOrOpenWarenkorbBestellung(
  bestellungCreation: addOrOpenWarenkorbBestellungCreationAttributes
): Promise<Bestellungposition> {
  const bestellungsId = await getBestellungsId(bestellungCreation.kundenId);

  const newBestellung = Bestellungposition.create({
    bestellungsId: bestellungsId,
    produktId: bestellungCreation.produktId,
    bestellmenge: bestellungCreation.produktMenge
  });

  return newBestellung;
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
    const bestellung = await Bestellung.create({
      adressenId: adressen[0].adressenId
    });
    return bestellung.bestellungsId;
  } catch (error) {
    throw errorChecking(error);
  }
}

export async function placeOrder(orderData: PlaceOrderCreationAttributes) {
  try {
    const warenkorb = await findWarenkorb(orderData.kundenId);
    const orderedBestellung = await warenkorb.update({
      zahlungsId: orderData.zahlungsId,
      adressenId: orderData.adressenId,
      bestellDatum: orderData.bestellDatum,
      gewünschtesLieferdatum: orderData.gewünschtesLieferdatum
    });
    return orderedBestellung;
  } catch (error) {
    throw errorChecking(error);
  }
}

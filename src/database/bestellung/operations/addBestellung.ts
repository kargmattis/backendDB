import type { BestellungCreationAttributes } from "../../../global/types";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import { findProdukt } from "../../produkt/operations/findProdukt";
import Bestellung from "../bestellung";

export async function addBestellung(
  bestellung: BestellungCreationAttributes
): Promise<Bestellung> {
  console.log(bestellung);
  const newBestellung = await Bestellung.create(bestellung);
  for (const id of bestellung.produktIds) {
    Bestellungposition.create({
      bestellungsId: newBestellung.bestellungsId,
      produktId: id,
      bestellmenge: 1
    });
  }
  return newBestellung;
}

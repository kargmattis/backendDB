import { BestellungCreationAttributes } from "../../../global/types";
import Bestellung from "../bestellung";

export async function addBestellung(
  bestellung: BestellungCreationAttributes
): Promise<Bestellung> {
  console.log(bestellung);
  const newBestellung = await Bestellung.create(bestellung);
  // for (const id of productIds) {
  //   newBestellung.addProduct(id);
  // }
  return newBestellung;
}

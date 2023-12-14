import Bestellung from "../bestellung";

export async function addBestellung(productIds: string[]): Promise<void> {
  const newBestellung = await Bestellung.create({
    bestellDatum: new Date(),
    gewünschtesLieferdatum: new Date()
  });
  for (const id of productIds) {
    newBestellung.addProduct(id);
  }
}

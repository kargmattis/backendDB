import Produkt from "../produkt";

export async function findProdukt(id: string): Promise<Produkt | null> {
  try {
    const produkt = await Produkt.findByPk(id);
    console.log(produkt);

    return produkt;
  } catch (error) {
    console.error("Error finding product:", error);
    throw error;
  }
}

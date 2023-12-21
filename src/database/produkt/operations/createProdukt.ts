import { ProduktCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Produkt from "../produkt";

export async function createProdukt(
  input: ProduktCreationAttributes
): Promise<Produkt> {
  try {
    const newProdukt = await Produkt.create(input);
    return newProdukt;
  } catch (error) {
    console.error("Error creating product:", error);
    throw errorChecking(error);
  }
}

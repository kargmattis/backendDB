import { errorChecking } from "../../../utilities/errorChecking";
import Produkt from "../produkt";

export async function createProdukt(): Promise<Produkt> {
  try {
    const newProdukt = await Produkt.create({
      title: "Orangenmenü 1",
      price: 5.99,
      image: ""
      // kundenId: "3841d240-9cdc-11ee-8e14-ef878a35fbb4"
    });
    return newProdukt;
  } catch (error) {
    console.error("Error creating product:", error);
    throw errorChecking(error);
  }
}

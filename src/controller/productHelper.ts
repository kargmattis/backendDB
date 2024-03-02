import Produkt from "../database/produkt/produkt";
import { findZutatById } from "../database/zutat/operations/findZutat";
import Zutat from "../database/zutat/zutat";
import { findZutatPositionWithProductId } from "../database/zutatenPostion/operation/findProductsIngridientsRelations";

export type ProduktUndZutaten = {
  produktId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  kundenId: string | null;
  createdAt: Date;
  updatedAt: Date;
  Zutaten: Array<Zutat>;
};

export async function ZutatenMitProduktId(
  productId: string
): Promise<Array<Zutat>> {
  const zutaten: Array<Zutat> = [];
  const zutatenpositionen = await findZutatPositionWithProductId(productId);

  for (const element of zutatenpositionen) {
    const zutat = await findZutatById(element.zutatsId);
    if (zutat) {
      zutaten.push(zutat);
    }
  }

  return zutaten;
}

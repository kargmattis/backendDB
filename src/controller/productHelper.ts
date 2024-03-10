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
      switch (zutat.zutatseinheit) {
        case "Gramm":
          zutat.zutatsname = `${element.zutatenMenge}g ${zutat.zutatsname}`;
          break;
        case "Milliliter":
          zutat.zutatsname = `${element.zutatenMenge}ml ${zutat.zutatsname}`;
          break;
        case "Stück":
          zutat.zutatsname = `${element.zutatenMenge}x ${zutat.zutatsname}`;
          break;
        case "Scheiben":
          zutat.zutatsname = `${element.zutatenMenge} ${
            element.zutatenMenge === 1 ? "Scheibe" : "Scheiben"
          } ${zutat.zutatsname}`;
          break;
        case "Portion":
          zutat.zutatsname = `${element.zutatenMenge} ${
            element.zutatenMenge === 1 ? "Portion" : "Portionen"
          } ${zutat.zutatsname}`;
          break;
        default:
          zutat.zutatsname = `${element.zutatenMenge} ${zutat.zutatseinheit} ${zutat.zutatsname}`;
      }
      zutaten.push(zutat);
    }
  }

  return zutaten;
}

import { findAllProducts } from "../database/produkt/operations/findProdukt";
import Produkt from "../database/produkt/produkt";
import { findZutat } from "../database/zutat/operations/findZutat";
import Zutat from "../database/zutat/zutat";
import ZutatenPosition from "../database/zutatenPostion/zutatenPosition";

export function test() {
  createPosition();
}

const productsToIngredients = [
  {
    Produkt: "Baguette",
    Zutaten: ["Brötchen"]
  }
];

async function createPosition() {
  for (const element of productsToIngredients) {
    const produkt = await Produkt.findOne({
      where: { titel: element.Produkt }
    });
    for (const zutatname of element.Zutaten) {
      const zutat = await Zutat.findOne({ where: { zutatsname: zutatname } });
      if (produkt && zutat) {
        ZutatenPosition.create({
          zutatsId: zutat.zutatsId,
          produktId: produkt.produktId,
          zutatenMenge: 2
        });
      }
    }
  }
}

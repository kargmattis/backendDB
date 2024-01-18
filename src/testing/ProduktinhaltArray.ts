import { findAllProducts } from "../database/produkt/operations/findProdukt";
import Produkt from "../database/produkt/produkt";
import { findZutat } from "../database/zutat/operations/findZutat";
import Zutat from "../database/zutat/zutat";
import ZutatenPosition from "../database/zutatenPostion/zutatenPosition";

interface ZutatProdukt {
  productID: string;
  ingredientsID: string;
  quantity: number;
}
// async function loadData() {
//   const products: Array<Produkt> = await findAllProducts();
//   const products2 = products.Produkt.
//   const ingredients: Array<Zutat> = await findZutat();
// }

export function test() {
  createPosition();
}

//Array mit allen Beziehungen zwischen Zutaten und Produkten
const Produktinhalt: Array<ZutatProdukt> = [
  {
    productID: "test",
    ingredientsID: "test2",
    quantity: 0
  }
];

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

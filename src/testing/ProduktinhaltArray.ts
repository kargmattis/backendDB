import Produkt from "../database/produkt/produkt";
import Zutat from "../database/zutat/zutat";
import ZutatenPosition from "../database/zutatenPostion/zutatenPosition";

export function createIngredientsToProducts() {
  createPosition();
}

const productsToIngredients = [
  {
    Produkt: "Baguette",
    Zutaten: [{ name: "Baguette", quantity: 200 }]
  },
  {
    Produkt: "Käsebaguette",
    Zutaten: [
      { name: "Baguette", quantity: 200 },
      { name: "Käse", quantity: 20 },
      { name: "Butter", quantity: 5 }
    ]
  },
  {
    Produkt: "Veganes Käsebaguette",
    Zutaten: [
      { name: "Baguette", quantity: 200 },
      { name: "vegane Käse", quantity: 20 },
      { name: "Butter", quantity: 5 }
    ]
  },
  {
    Produkt: "Brezel",
    Zutaten: [{ name: "Brezel", quantity: 200 }]
  },
  {
    Produkt: "Türkisches Menemen",
    Zutaten: [
      { name: "Zwiebel", quantity: 5 },
      { name: "Paprika", quantity: 100 },
      { name: "Tomate", quantity: 75 },
      { name: "Ei", quantity: 25 }
    ]
  },
  {
    Produkt: "Brötchen",
    Zutaten: [{ name: "Brötchen", quantity: 200 }]
  },
  {
    Produkt: "Croissant",
    Zutaten: [{ name: "Croissant", quantity: 200 }]
  },
  {
    Produkt: "Fresh Chicken",
    Zutaten: [
      { name: "Baguette", quantity: 200 },
      { name: "Schinken", quantity: 10 },
      { name: "Salami", quantity: 10 },
      { name: "Tomate", quantity: 25 },
      { name: "Ei", quantity: 25 },
      { name: "Eisbergsalat", quantity: 25 }
    ]
  },
  {
    Produkt: "Veganer Toast",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "vegane Salami", quantity: 10 },
      { name: "Tomate", quantity: 25 },
      { name: "vegane Käse", quantity: 25 },
      { name: "Eisbergsalat", quantity: 25 }
    ]
  },
  {
    Produkt: "Toast mit Rinderpatty",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "Rinderpatty", quantity: 10 },
      { name: "Tomate", quantity: 25 },
      { name: "Käse", quantity: 25 },
      { name: "Eisbergsalat", quantity: 25 }
    ]
  },
  {
    Produkt: "Espresso",
    Zutaten: [
      { name: "Kaffee", quantity: 25 },
      { name: "Wasser", quantity: 25 }
    ]
  },
  {
    Produkt: "Schwarzer Kaffee",
    Zutaten: [
      { name: "Kaffee", quantity: 150 },
      { name: "Wasser", quantity: 150 }
    ]
  },
  {
    Produkt: "Latte Machiatto",
    Zutaten: [
      { name: "Kaffee", quantity: 100 },
      { name: "Milch", quantity: 200 }
    ]
  },
  {
    Produkt: "Orangensaft",
    Zutaten: [
      { name: "frische gepresste Orangen", quantity: 100 },
      { name: "Wasser", quantity: 200 }
    ]
  },
  {
    Produkt: "Wasser",
    Zutaten: [{ name: "Wasser", quantity: 300 }]
  },
  {
    Produkt: "Schwarzer Tee",
    Zutaten: [
      { name: "Schwarzer Tee", quantity: 15 },
      { name: "Wasser", quantity: 285 }
    ]
  },
  {
    Produkt: "Früchtetee",
    Zutaten: [
      { name: "Waldbeerenfrüchtetee", quantity: 15 },
      { name: "Wasser", quantity: 285 }
    ]
  },
  {
    Produkt: "Zitronentee",
    Zutaten: [
      { name: "Zitronentee aus frischen Zitronen", quantity: 15 },
      { name: "Wasser", quantity: 285 }
    ]
  },
  {
    Produkt: "Heiße Schokolade",
    Zutaten: [
      { name: "Schokolade", quantity: 50 },
      { name: "Wasser", quantity: 20 }
    ]
  },
  {
    Produkt: "Das kleine Osterfrühstück",
    Zutaten: [
      { name: "Croissant", quantity: 200 },
      { name: "Ei", quantity: 100 },
      { name: "Kaffee", quantity: 100 },
      { name: "Milch", quantity: 200 }
    ]
  },
  {
    Produkt: "Bayrisches Menü",
    Zutaten: [
      { name: "Brezel", quantity: 200 },
      { name: "Alkoholfreies Bier", quantity: 300 },
      { name: "Weißwurst", quantity: 100 }
    ]
  },
  {
    Produkt: "Wecken mit Kaffee",
    Zutaten: [
      { name: "Brötchen", quantity: 200 },
      { name: "Kaffee", quantity: 150 },
      { name: "Wasser", quantity: 150 }
    ]
  },
  {
    Produkt: "Obstmenü",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "Ei", quantity: 25 },
      { name: "Saisonales Obst", quantity: 150 },
      { name: "Waldbeerenfrüchtetee", quantity: 15 },
      { name: "Wasser", quantity: 285 }
    ]
  },
  {
    Produkt: "Eiermenü",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "Ei", quantity: 25 },
      { name: "Zitronentee", quantity: 15 },
      { name: "Wasser", quantity: 285 }
    ]
  },
  {
    Produkt: "Klassisches Menü",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "Ei", quantity: 25 },
      { name: "Kaffee", quantity: 25 },
      { name: "Wasser", quantity: 25 },
      { name: "Kräuterquark", quantity: 25 }
    ]
  },
  {
    Produkt: "Veggiemenü",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "frische gepresste Orangen", quantity: 100 },
      { name: "Wasser", quantity: 200 },
      { name: "Broccoli", quantity: 25 },
      { name: "Tomate", quantity: 25 }
    ]
  },
  {
    Produkt: "Morgensonne",
    Zutaten: [
      { name: "Toast", quantity: 200 },
      { name: "Pfirsichmarmelade", quantity: 15 },
      { name: "Saisonales Obst", quantity: 100 }
    ]
  }
];

async function createPosition() {
  for (const element of productsToIngredients) {
    const produkt = await Produkt.findOne({
      where: { titel: element.Produkt }
    });

    for (const zutatdata of element.Zutaten) {
      const zutat = await Zutat.findOne({
        where: { zutatsname: zutatdata.name }
      });

      if (produkt && zutat) {
        // Überprüfen, ob ein Datensatz bereits existiert
        const existingPosition = await ZutatenPosition.findOne({
          where: { zutatsId: zutat.zutatsId, produktId: produkt.produktId }
        });

        if (!existingPosition) {
          // Wenn nicht vorhanden, dann erstellen
          await ZutatenPosition.create({
            zutatsId: zutat.zutatsId,
            produktId: produkt.produktId,
            zutatenMenge: zutatdata.quantity
          });
          console.log("Position erstellt:", zutatdata.name, element.Produkt);
        } else {
          console.log(
            "Position existiert bereits:",
            zutatdata.name,
            element.Produkt
          );
        }
      }
    }
  }
}

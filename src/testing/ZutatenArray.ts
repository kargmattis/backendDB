import { type ZutatCreationAttributes } from "../global/types";

// Array mit allen Zutaten
const Zutaten: ZutatCreationAttributes[] = [
  // Backwaren (1.Konfigurationsschritt)
  {
    zutatsname: "Baguette",
    zutatseigenschaft: "vegan",
    zutatspreis: 2.99,
    zutatseinheit: "g",
    zutatBild: "Baguette.webp",
    zutatensparte: "Brot"
  },
  {
    zutatsname: "Brötchen",
    zutatseigenschaft: "vegan",
    zutatspreis: 1.29,
    zutatseinheit: "g",
    zutatBild: "Broetchen.webp",
    zutatensparte: "Brot"
  },
  {
    zutatsname: "Brezel",
    zutatseigenschaft: "vegan",
    zutatspreis: 1.49,
    zutatseinheit: "g",
    zutatBild: "Brezel.webp",
    zutatensparte: "Brot"
  },
  {
    zutatsname: "Croissant",
    zutatseigenschaft: "vegan",
    zutatspreis: 1.79,
    zutatseinheit: "g",
    zutatBild: "Croissant.webp",
    zutatensparte: "Brot"
  },
  {
    zutatsname: "Toast",
    zutatseigenschaft: "vegan",
    zutatspreis: 1.0,
    zutatseinheit: "g",
    zutatBild: "Toast.webp",
    zutatensparte: "Brot"
  },

  // Toppings (2.Konfigurationsschritt)
  {
    zutatsname: "Salami",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Salami.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Schinken",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Schinken.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Käse",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Kaese.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Butter",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Butter.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Erdbeermarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Erdbeermarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Pfirsichmarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Pfirsichmarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Kirschmarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Kirschmarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Nutella",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nutella.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "vegane Salami",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "VeganeSalami.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "vegane Käse",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nutella.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Rinderpatty",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nutella.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Kräuterquark",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nutella.webp",
    zutatensparte: "Topping"
  },

  //Other only for Products
  {
    zutatsname: "Zwiebel",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Paprika",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Tomate",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Ei",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Eisbergsalat",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Kaffee",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Wasser",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Milch",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "frische gepresste Orangen",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Waldbeerenfrüchtetee",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Zitronentee aus frischen Zitronen",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Schokolade",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Schwarzer Tee",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Alkoholfreies Bier",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Weißwurst",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Saisonales Obst",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  },
  {
    zutatsname: "Broccoli",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Nothing.webp",
    zutatensparte: "Other"
  }
];

export default Zutaten;

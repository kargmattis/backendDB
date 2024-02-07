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
    zutatspreis: 1.00,
    zutatseinheit: "g",
    zutatBild: "Toast.webp",
    zutatensparte: "Brot"
  },

  // Toppings (2.Konfigurationsschritt)
  {
    zutatsname: "Salami",
    zutatseigenschaft: "not vegan",
    zutatspreis: 0.99,
    zutatseinheit: "Scheiben",
    zutatBild: "Salami.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Schinken",
    zutatseigenschaft: "not vegan",
    zutatspreis: 0.99,
    zutatseinheit: "Scheiben",
    zutatBild: "Schinken.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Rinderpatty",
    zutatseigenschaft: "not vegan",
    zutatspreis: 1.20,
    zutatseinheit: "Scheiben",
    zutatBild: "rinderpatty.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Käse",
    zutatseigenschaft: "not vegan",
    zutatspreis: 0.79,
    zutatseinheit: "Scheiben",
    zutatBild: "Kaese.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Butter",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.30,
    zutatseinheit: "Portion",
    zutatBild: "Butter.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Kräuterquark",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "Portion",
    zutatBild: "frischkaeseaufstrich.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Erdbeermarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.40,
    zutatseinheit: "Portion",
    zutatBild: "Erdbeermarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Pfirsichmarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.40,
    zutatseinheit: "Portion",
    zutatBild: "Pfirsichmarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Kirschmarmelade",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.40,
    zutatseinheit: "Portion",
    zutatBild: "Kirschmarmelade.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "Nutella",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.50,
    zutatseinheit: "Portion",
    zutatBild: "Nutella.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "vegane Salami",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.90,
    zutatseinheit: "Scheiben",
    zutatBild: "VeganeSalami.webp",
    zutatensparte: "Topping"
  },
  {
    zutatsname: "veganer Käse",
    zutatseigenschaft: "vegan",
    zutatspreis: 0.90,
    zutatseinheit: "Scheiben",
    zutatBild: "veganerKaese.webp",
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
  },

//Extras
{
  zutatsname: "Frühstücksei (gekocht)",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.20,
  zutatseinheit: "Stück",
  zutatBild: "Fruestuecksei.webp",
  zutatensparte: "Extra"
},
{
  zutatsname: "Rührei",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.50,
  zutatseinheit: "Stück",
  zutatBild: "Ruehrei.webp",
  zutatensparte: "Extra"
},
{
  zutatsname: "Omlette",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.50,
  zutatseinheit: "Stück",
  zutatBild: "Omelette.webp",
  zutatensparte: "Extra"
},
{
  zutatsname: "Spiegelei",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.50,
  zutatseinheit: "Stück",
  zutatBild: "Spiegelei.webp",
  zutatensparte: "Extra"
},{
  zutatsname: "Apfel",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.10,
  zutatseinheit: "Stück",
  zutatBild: "Apfel.webp",
  zutatensparte: "Extra"
},{
  zutatsname: "Banane",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.10,
  zutatseinheit: "Stück",
  zutatBild: "Banane.webp",
  zutatensparte: "Extra"
},{
  zutatsname: "Birne",
  zutatseigenschaft: "vegan",
  zutatspreis: 1.10,
  zutatseinheit: "Stück",
  zutatBild: "Birne.webp",
  zutatensparte: "Extra"
}




];

export default Zutaten;

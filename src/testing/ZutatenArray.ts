import { ZutatCreationAttributes } from "../global/types";

//Array mit allen Zutaten
const Zutaten: Array<ZutatCreationAttributes> = [
  {
    zutatsname: "Baguette",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Food/BaguetteAlone.webp",
    zutatensparte: "Brot"
  },
  {
    zutatsname: "Orangensaft",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Drinks/Orangensaft.webp",
    zutatensparte: "Getränk"
  },
  {
    zutatsname: "Mehl",
    zutatseigenschaft: "vegan",
    zutatspreis: 1,
    zutatseinheit: "g",
    zutatBild: "Food/Croissant.webp",
    zutatensparte: "Topping"
  }
];

export default Zutaten;

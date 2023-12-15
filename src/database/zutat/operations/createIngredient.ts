import { errorChecking } from "../../../utilities/errorChecking";
import Ingredient from "../zutat";

export async function createIngredient(): Promise<Ingredient> {
  try {
    const newIngredient = await Ingredient.create({
      zutatsname: "Mehl",
      zutatseigenschaft: "vegan",
      zutatsprice: 1,
      zutatseinheit: "g"
    });
    return newIngredient;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw errorChecking(error);
  }
}

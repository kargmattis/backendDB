import { errorChecking } from "../../../utilities/errorChecking";
import Zutat from "../zutat";

export async function createIngredient(): Promise<Zutat> {
  try {
    const newIngredient = await Zutat.create({
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

import Zutat from "../zutat";
import { errorChecking } from "../../../utilities/errorChecking";

export async function deleteIngredient(id: string) {
  try {
    await Zutat.update({ zutatensparte: null }, { where: { zutatsId: id } });
    return true;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

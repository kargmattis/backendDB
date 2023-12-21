import { ZutatCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Zutat from "../zutat";

export async function createZutat(
  zutat: ZutatCreationAttributes
): Promise<Zutat> {
  try {
    const newZutat = await Zutat.create({
      zutatsname: "Mehl",
      zutatseigenschaft: "vegan",
      zutatspreis: 1,
      zutatseinheit: "g"
    });
    return newZutat;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw errorChecking(error);
  }
}

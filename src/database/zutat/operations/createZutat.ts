import { type ZutatCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Zutat from "../zutat";

export async function createZutat(
  zutat: ZutatCreationAttributes
): Promise<Zutat> {
  try {
    const newZutat = await Zutat.create(zutat);
    return newZutat;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw errorChecking(error);
  }
}

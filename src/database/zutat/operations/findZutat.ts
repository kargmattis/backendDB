// findZutat.ts
import { errorChecking } from "../../../utilities/errorChecking";
import Zutat from "../zutat";

export async function findZutat(): Promise<Zutat[]> {
  try {
    const zutatItems = await Zutat.findAll();
    return zutatItems;
  } catch (error) {
    // You may want to log the error or perform additional error handling
    throw errorChecking(error);
  }
}

// find Zutaten by sparte

export async function findZutatBySparte(sparte: string): Promise<Zutat[]> {
  try {
    const zutatItems = await Zutat.findAll({
      where: {
        zutatensparte: sparte
      }
    });
    return zutatItems;
  } catch (error) {
    // You may want to log the error or perform additional error handling
    throw error;
  }
}

// findZutat.ts
import Zutat from "../zutat";

export async function findZutat(): Promise<Zutat[]> {
  try {
    const zutatItems = await Zutat.findAll();
    return zutatItems;
  } catch (error) {
    // You may want to log the error or perform additional error handling
    throw error;
  }
}

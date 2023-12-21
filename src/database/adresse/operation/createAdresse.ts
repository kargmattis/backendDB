import type { AdresseCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";

export async function createAdresse(
  adressenData: AdresseCreationAttributes
): Promise<Adresse> {
  try {
    const newAdresse = await Adresse.create(adressenData);
    return newAdresse;
  } catch (error) {
    console.error("Error creating new Adresse record: ", error);
    throw errorChecking(error);
  }
}

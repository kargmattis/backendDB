import { AdresseCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../addresse";

export async function createAdress(
  adressData: AdresseCreationAttributes
): Promise<Adresse> {
  try {
    const newAdress = await Adresse.create(adressData);
    return newAdress;
  } catch (error) {
    console.error("Error creating new Paypal record: ", error);
    throw errorChecking(error);
  }
}

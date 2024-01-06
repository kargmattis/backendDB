import { ErrorHandle } from "../../../global/enums";
import { AdresseCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";
import { findAdressIdByKundenId, findCurrentAdresse } from "./findAdresse";
export default async function putAdresse(
  input: AdresseCreationAttributes,
  kundenId: string
): Promise<Adresse> {
  try {
    const adressId = await findAdressIdByKundenId(kundenId);
    const adresse = await findCurrentAdresse(adressId);
    if (adresse === null) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
    }
    console.log(adresse.laufendeAdressenId);

    const newAdressincrement = (adresse.laufendeAdressenId += 1);
    console.log(adresse.laufendeAdressenId);
    await adresse.update({ input, newAdressincrement });
    return adresse;
  } catch (error) {
    throw errorChecking(error);
  }
}

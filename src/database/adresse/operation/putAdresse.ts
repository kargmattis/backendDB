import { ErrorHandle } from "../../../global/enums";
import { AdresseCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";
import { findCurrentAdresse } from "./findAdresse";
export default async function putAdresse(
  input: AdresseCreationAttributes
): Promise<Adresse> {
  try {
    const adresse = await findCurrentAdresse(input.kundenId);
    if (adresse === null) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
    }
    console.log(adresse.laufendeAdressenId);

    const newAdressincrement = adresse.laufendeAdressenId + 1;
    console.log(newAdressincrement, "newAdressincrement");

    console.log(input);
    console.log({ ...input, laufendeAdressenId: newAdressincrement });

    const updatetAdresse = await Adresse.create({
      ...input,
      laufendeAdressenId: newAdressincrement
    });
    return updatetAdresse;
  } catch (error) {
    throw errorChecking(error);
  }
}

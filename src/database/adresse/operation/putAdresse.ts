import { ErrorHandle } from "../../../global/enums";
import { AdresseCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";
export default async function putAdresse(
  input: AdresseCreationAttributes,
  kundenId: string
): Promise<Adresse> {
  try {
    const adresse = await Adresse.findByPk(kundenId);
    if (adresse === null) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
    }
    await adresse.update(input);
    return adresse;
  } catch (error) {
    throw errorChecking(error);
  }
}

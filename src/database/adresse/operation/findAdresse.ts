import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";

export async function findAdresseByKundenId(
  kundenId: string
): Promise<Adresse> {
  try {
    const adresse = await Adresse.findOne({
      where: {
        kundenId: kundenId
      }
    });
    if (adresse === null) {
      throw new CustomError(ErrorHandle.NotFound, "Adresse not found");
    }
    return adresse;
  } catch (error) {
    throw errorChecking(error);
  }
}

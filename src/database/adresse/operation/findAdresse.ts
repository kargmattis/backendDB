import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";

export async function findAllAdressen(kundenId: string): Promise<Adresse[]> {
  try {
    const result = await Adresse.findAll({
      where: {
        kundenId
      }
    });
    if (result.length === 0) {
      throw new CustomError(ErrorHandle.NotFound, "Adresse not found");
    }
    return result;
  } catch (error) {
    throw errorChecking(error);
  }
}

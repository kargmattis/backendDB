import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";

// export async function findAdressIdByKundenId(
//   kundenId: string
// ): Promise<string> {
//   try {
//     const adresse = await Adresse.findOne({
//       where: {
//         kundenId: kundenId
//       }
//     });
//     if (adresse === null) {
//       throw new CustomError(ErrorHandle.NotFound, "Adresse not found");
//     }
//     return adresse.adressenId;
//   } catch (error) {
//     throw errorChecking(error);
//   }
// }

export async function findCurrentAdresse(kundenId: string): Promise<Adresse> {
  try {
    const result = await Adresse.findAndCountAll({
      where: {
        kundenId
      },
      order: [["laufendeAdressenId", "DESC"]]
    });
    if (result.count === 0) {
      throw new CustomError(ErrorHandle.NotFound, "Adresse not found");
    }
    return result.rows[0];
  } catch (error) {
    throw errorChecking(error);
  }
}

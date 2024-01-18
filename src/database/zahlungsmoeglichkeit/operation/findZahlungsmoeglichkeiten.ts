import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";

export async function findCurrentZahlungsmöglichkeiten(kundenId: string) {
  try {
    const result = await ZahlungsMoeglichkeiten.findAndCountAll({
      where: {
        kundenId
      },
      order: [["laufendeZahlungsId", "DESC"]],
      limit: 1
    });
    if (result.count === 0) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde not found");
    }
    return result.rows[0];
  } catch (error) {
    throw errorChecking(error);
  }
}

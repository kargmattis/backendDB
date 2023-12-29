import { type KundeCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Kunde from "../kunde";

export async function createKunde(
  kundenData: KundeCreationAttributes
): Promise<Kunde> {
  try {
    const kunde = await Kunde.create(kundenData);
    return kunde;
  } catch (error) {
    throw errorChecking(error);
  }
}

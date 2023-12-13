import { KundeCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Kunde from "../kunde";

export async function createKunde(
  kundeData: KundeCreationAttributes
): Promise<Kunde> {
  try {
    const kunde = await Kunde.create(kundeData);
    return kunde;
  } catch (error) {
    throw errorChecking(error);
  }
}

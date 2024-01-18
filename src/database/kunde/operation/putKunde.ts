import { ErrorHandle } from "../../../global/enums";
import { type KundeCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Kunde from "../kunde";

export default async function putKunde(
  input: KundeCreationAttributes,
  kundenId: string
): Promise<Kunde> {
  try {
    const kunde = await Kunde.findByPk(kundenId);
    if (kunde === null) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
    }
    await kunde.update(input);
    return kunde;
  } catch (error) {
    throw errorChecking(error);
  }
}

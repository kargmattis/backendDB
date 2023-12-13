import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Kunde from "../kunde";

export async function findKunde(kundenId: string): Promise<Kunde> {
  try {
    const kunde = await Kunde.findByPk(kundenId);
    if (kunde !== null) {
      return kunde;
    }
    throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
  } catch (error) {
    throw errorChecking(error);
  }
}

// Funktion, um mehrere Kunden zu suchen
export async function findKunden(email: string) {
  try {
    const kunden = await Kunde.findAll({ where: { email } });
    console.log(`${kunden.length} Kunden gefunden`);
  } catch (error) {
    errorChecking(error);
  }
}

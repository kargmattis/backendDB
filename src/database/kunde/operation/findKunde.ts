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
    // TODO
    const kunden = await Kunde.findAll({ where: { email } });
    return kunden;
  } catch (error) {
    throw errorChecking(error);
  }
}

// Funktion, um einen Kunden anhand der E-Mail zu suchen
export async function findKundeByEmail(email: string): Promise<Kunde | null> {
  try {
    const kunde = await Kunde.findOne({ where: { email } });
    if (kunde !== null) {
      return kunde;
    }
    throw new CustomError(ErrorHandle.NotFound, "Kunde nicht gefunden");
  } catch (error) {
    console.log(error);

    throw errorChecking(error);
  }
}

export async function getKundeAboenddate(id: string): Promise<string> {
  try {
    const kunde = await Kunde.findByPk(id);
    if (kunde) {
      return kunde.zeitungsaboablaufdatum.toISOString().split("T")[0]; //COnvert Date in String with format: yyyy-mm-dd
    } else {
      throw new Error("Kunde nicht gefunden");
    }
  } catch (error) {
    console.log(error);

    throw errorChecking(error);
  }
}

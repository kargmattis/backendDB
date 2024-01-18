import { ZahlungsmöglichkeitenCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";

export async function createZahlungsmöglichkeit(
  zahlungsMöglichkeitenData: ZahlungsmöglichkeitenCreationAttributes
): Promise<ZahlungsMoeglichkeiten> {
  try {
    const newAdresse = await ZahlungsMoeglichkeiten.create(
      zahlungsMöglichkeitenData
    );
    return newAdresse;
  } catch (error) {
    console.error("Error creating new Adresse record: ", error);
    throw errorChecking(error);
  }
}

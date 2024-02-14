import type { AdresseCreationAttributes } from "../../../global/types";
import { errorChecking } from "../../../utilities/errorChecking";
import Adresse from "../adresse";

export async function createAdresse(
  adressenData: AdresseCreationAttributes
): Promise<Adresse> {
  try {
    const addresses = await Adresse.findAll({
      where: { kundenId: adressenData.kundenId },
      order: [["laufendeAdressenId", "DESC"]],
      limit: 1
    });

    if (addresses && addresses.length > 0) {
      const existingAdresse = addresses[0];
      console.log("existingAdresse", existingAdresse.laufendeAdressenId);

      const newAdress = await Adresse.create({
        ...adressenData,
        laufendeAdressenId: existingAdresse.laufendeAdressenId + 1
      });

      return newAdress;
    } else {
      const newAdresse = await Adresse.create(adressenData);
      return newAdresse;
    }
  } catch (error) {
    console.error("Error creating or updating Adresse record: ", error);
    throw errorChecking(error);
  }
}

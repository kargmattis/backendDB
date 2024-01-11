import { findWarenkorb } from "../../database/bestellung/operations/findBestellung";
import Bestellungposition from "../../database/bestellungsPosition/bestellungsPosition";
import { findProduktByPk } from "../../database/produkt/operations/findProdukt";
import Produkt from "../../database/produkt/produkt";
import { ErrorHandle } from "../../global/enums";
import { ProduktWithBestellmenge } from "../../global/types";
import CustomError from "../../utilities/error";
import { errorChecking } from "../../utilities/errorChecking";

export async function warenkorbGetHelper(
  kundenId: string
): Promise<Array<ProduktWithBestellmenge>> {
  try {
    const produkte = [];
    const warenkorb = await findWarenkorb(kundenId);
    const bestellungsPosition = await Bestellungposition.findAll({
      where: { bestellungsId: warenkorb.bestellungsId }
    });
    for (const singlePosition of bestellungsPosition) {
      const singleProduct = await findProduktByPk(singlePosition.produktId);
      if (!singleProduct) {
        throw new CustomError(ErrorHandle.NotFound, "Produkt not found");
      }
      const warenkorbProdukt = {
        ...singleProduct.dataValues,
        anzahl: singlePosition.bestellmenge
      };
      produkte.push(warenkorbProdukt);
    }
    return produkte;
  } catch (error) {
    throw errorChecking(error);
  }
}

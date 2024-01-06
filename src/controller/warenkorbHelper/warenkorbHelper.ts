import { findWarenkorb } from "../../database/bestellung/operations/findBestellung";
import { findProduktByPk } from "../../database/produkt/operations/findProdukt";
import Produkt from "../../database/produkt/produkt";
import { ErrorHandle } from "../../global/enums";
import CustomError from "../../utilities/error";
import { errorChecking } from "../../utilities/errorChecking";

export async function warenkorbGetHelper(
  kundenId: string
): Promise<Array<Produkt>> {
  try {
    const warenkorb = await findWarenkorb(kundenId);
    const produkte = [];
    for (const singlePosition of warenkorb) {
      const singleProduct = await findProduktByPk(singlePosition.produktId);
      if (!singleProduct) {
        throw new CustomError(ErrorHandle.NotFound, "Produkt not found");
      }
      produkte.push(singleProduct.dataValues);
    }
    return produkte;
  } catch (error) {
    throw errorChecking(error);
  }
}

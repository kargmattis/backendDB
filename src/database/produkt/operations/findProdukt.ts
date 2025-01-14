import { errorChecking } from "../../../utilities/errorChecking";
import Produkt from "../produkt";

export async function findProduktByPk(id: string): Promise<Produkt | null> {
  try {
    const produkt = await Produkt.findByPk(id);
    // console.log(produkt);

    return produkt;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

export async function findAllProducts(): Promise<Array<Produkt>> {
  try {
    const produkt = await Produkt.findAll();
    return produkt;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

export async function findProductWithoutKundeId(): Promise<Produkt[] | null> {
  try {
    const produkt = await Produkt.findAll({
      where: {
        kundenId: null
      }
    });
    // console.log(produkt);

    return produkt;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

export async function findProduktByKundeId(
  kundenId: string
): Promise<Produkt[] | null> {
  try {
    const produkt = await Produkt.findAll({
      where: {
        kundenId
      }
    });
    return produkt;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

import Produkt from "../produkt";
import { errorChecking } from "../../../utilities/errorChecking";

export async function deleteProdukt(id: string) {
  try {
    await Produkt.update({ sparte: "deleted" }, { where: { produktId: id } });
    return true;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

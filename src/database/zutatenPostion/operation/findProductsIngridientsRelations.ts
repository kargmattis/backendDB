import { errorChecking } from "../../../utilities/errorChecking";
import ZutatenPosition from "../zutatenPosition";

export async function findAllProductsIngridiendsRelations(): Promise<
  Array<ZutatenPosition>
> {
  try {
    const zutatenPosition = await ZutatenPosition.findAll();
    return zutatenPosition;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

export async function findZutatPositionWithProductId(
  produktId: string
): Promise<Array<ZutatenPosition>> {
  try {
    const zutatenPosition = await ZutatenPosition.findAll({
      where: {
        produktId
      }
    });
    return zutatenPosition;
  } catch (error) {
    console.error("Error finding product:", error);
    const customError = errorChecking(error);
    throw customError;
  }
}

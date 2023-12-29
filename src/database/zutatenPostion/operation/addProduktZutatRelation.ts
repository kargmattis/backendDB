import { type ZutatenPositionCreationAttributes } from "../../../global/types";
import ZutatenPosition from "../zutatenPosition";

export async function addProduktZutatRelation(
  input: ZutatenPositionCreationAttributes
): Promise<Array<ZutatenPosition>> {
  let zutatenPositionen: Array<ZutatenPosition> = [];
  for (const zutatenId of input.zutatIdWithAmount) {
    const zutatenPostion = await ZutatenPosition.create({
      zutatsId: zutatenId.zutatenId,
      produktId: input.produktId,
      zutatenMenge: zutatenId.zutatenMenge
    });
    zutatenPositionen.push(zutatenPostion);
  }
  return zutatenPositionen;
}

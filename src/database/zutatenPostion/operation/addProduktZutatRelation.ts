import { type ZutatenPositionCreationAttributes } from "../../../global/types";
import ZutatenPosition from "../zutatenPosition";

export function addProduktZutatRelation(
  input: ZutatenPositionCreationAttributes
) {
  for (const zutatenId of input.zutatIdWithAmount) {
    ZutatenPosition.create({
      zutatsId: zutatenId.zutatenId,
      produktId: input.productId,
      zutatenMenge: zutatenId.zutatenMenge
    });
  }
}

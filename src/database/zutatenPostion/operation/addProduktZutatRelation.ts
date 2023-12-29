import { ZutatenPositionCreationAttributes } from "../../../global/types";
import ZutatenPosition from "../zutatenPosition";

export function addProduktZutatRelation(
  input: ZutatenPositionCreationAttributes
) {
  for (const zutatenId of input.zutatIdWithAmount) {
    ZutatenPosition.create({
      zutatenId: zutatenId.zutatId,
      productId: input.productId,
      zutatenMenge: zutatenId.zutatenMenge
    });
  }
}

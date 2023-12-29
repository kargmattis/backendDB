import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Product from "../produkt/produkt";

class ZutatenPosition extends Model {
  public zutatenId!: string;
  public productId!: string;
  public zutatenMenge!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ZutatenPosition.init(
  {
    zutatId: {
      type: DataTypes.UUID,
      references: {
        model: "Zutat",
        key: "zutatenId"
      },
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Product",
        key: "productId"
      },
      primaryKey: true
    },
    zutatenMenge: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "ZutatenPosition",
    sequelize
  }
);

export default ZutatenPosition;

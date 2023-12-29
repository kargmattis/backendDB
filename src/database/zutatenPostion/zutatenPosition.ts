import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Product from "../produkt/produkt";

class ZutatenPosition extends Model {
  public zutatsId!: string;
  public produktId!: string;
  public zutatenMenge!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ZutatenPosition.init(
  {
    zutatsId: {
      type: DataTypes.UUID,
      references: {
        model: "Zutat",
        key: "zutatsId"
      },
      primaryKey: true
    },
    produktId: {
      type: DataTypes.UUID,
      references: {
        model: "Produkt",
        key: "produktId"
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

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

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
        model: "zutat",
        key: "zutatsId"
      },
      primaryKey: true
    },
    produktId: {
      type: DataTypes.UUID,
      references: {
        model: "produkt",
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
    tableName: "zutatenPosition",
    sequelize
  }
);

export default ZutatenPosition;

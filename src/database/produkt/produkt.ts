import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Produkt extends Model {
  public productId!: string;
  public titel!: string;
  public preis!: number;
  public bild!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Produkt.init(
  {
    produktId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    titel: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    preis: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    bild: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kundenId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Kunde",
        key: "kundenId"
      }
    }
  },
  {
    tableName: "Product",
    sequelize
  }
);

export default Produkt;

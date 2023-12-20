import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Produkt from "../produkt/produkt";

class Bestellungposition extends Model {
  public bestellungsId!: string;
  public produktId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bestellungposition.init(
  {
    bestellungsId: {
      type: DataTypes.UUID,
      references: {
        model: "Bestellung",
        key: "bestellungsId"
      },
      primaryKey: true
    },
    produktId: {
      type: DataTypes.UUID,
      references: {
        model: "Product",
        key: "productId"
      },
      allowNull: false,
      primaryKey: true
    },
    bestellmenge: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "Bestellung",
    sequelize
  }
);

export default Bestellungposition;

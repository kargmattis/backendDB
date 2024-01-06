import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Bestellungposition extends Model {
  public bestellungsId!: string;
  public produktId!: string;
  public bestellmenge!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bestellungposition.init(
  {
    bestellungsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Bestellung",
        key: "bestellungsId"
      }
    },
    produktId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Produkt",
        key: "produktId"
      }
    },
    bestellmenge: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "Bestellungposition",
    sequelize
  }
);

export default Bestellungposition;

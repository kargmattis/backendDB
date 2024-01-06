import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Bestellungposition extends Model {
  public bestellungPositionId!: string;
  public bestellungsId!: string;
  public produktId!: string;
  public bestellmenge!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bestellungposition.init(
  {
    bestellungPositionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    bestellungsId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Bestellung",
        key: "bestellungsId"
      }
    },
    produktId: {
      type: DataTypes.UUID,
      allowNull: false,
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

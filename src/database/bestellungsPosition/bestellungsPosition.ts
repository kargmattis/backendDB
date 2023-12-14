import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Product from "../product/product";

class Bestellungposition extends Model {
  public bestellungsId!: string;
  public adressId!: string;
  public zahlungsid!: string;
  public productId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bestellungposition.init(
  {
    bestellungsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    bestellDatum: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gewünschtesLieferdatum: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "Bestellung",
    sequelize
  }
);

export default Bestellungposition;

import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Product from "../product/product";

class Bestellung extends Model {
  public bestellungsId!: string;
  public bestellDatum!: Date;
  public gewünschtesLieferdatum!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public addProduct!: BelongsToManyAddAssociationMixin<Product, string>;
}

Bestellung.init(
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

export default Bestellung;

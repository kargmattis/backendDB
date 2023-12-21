import { BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Product from "../produkt/produkt";

class Bestellung extends Model {
  public bestellungsId!: string;
  public adressId!: string;
  public paypalId!: string;
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
    adressId: {
      type: DataTypes.UUID,
      references: {
        model: "Adresse",
        key: "adressId"
      }
    },
    paypalId: {
      type: DataTypes.UUID,
      references: {
        model: "Paypal",
        key: "zahlungsId"
      }
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

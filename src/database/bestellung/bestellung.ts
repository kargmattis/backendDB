import { type BelongsToManyAddAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import type Product from "../produkt/produkt";

class Bestellung extends Model {
  public bestellungsId!: string;
  public adressenId!: string;
  public zahlungsId!: string;
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
    adressenId: {
      type: DataTypes.UUID,
      references: {
        model: "Adresse",
        key: "adressenId"
      },
      allowNull: false
    },
    zahlungsId: {
      type: DataTypes.UUID,
      references: {
        model: "Paypal",
        key: "zahlungsId"
      },
      allowNull: false
    },
    bestellDatum: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gewünschtesLieferdatum: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "Bestellung",
    sequelize
  }
);

export default Bestellung;

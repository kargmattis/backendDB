import {
  type BelongsToManyAddAssociationMixin,
  DataTypes,
  Model
} from "sequelize";
import { sequelize } from "../database";
import type Product from "../produkt/produkt";

class Bestellung extends Model {
  public bestellungsId!: string;
  public laufendeAdressenId!: number;
  public kundenId!: string;
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
    kundenId: {
      type: DataTypes.UUID,
      unique: false,
      references: {
        model: "Kunde",
        key: "kundenId"
      },
      allowNull: false
    },
    laufendeAdressenId: {
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: "Adresse",
        key: "laufendeAdressenId"
      },
      allowNull: false
    },
    zahlungsId: {
      type: DataTypes.UUID,
      unique: false,
      references: {
        model: "Paypal",
        key: "zahlungsId"
      },
      allowNull: true
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

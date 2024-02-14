import {
  type BelongsToManyAddAssociationMixin,
  DataTypes,
  Model,
  DATE
} from "sequelize";
import { sequelize } from "../database";
import type Product from "../produkt/produkt";

class Bestellung extends Model {
  public bestellungsId!: string;
  public laufendeAdressenId!: number;
  public kundenId!: string;
  public laufendeZahlungsId!: string;
  public bestellDatum!: Date;
  public gewünschtesLieferdatum!: Date;
  public lieferdatum!: Date;
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
      // references: {
      //   model: "adresse",
      //   key: "kundenId"
      // },
      allowNull: false
    },
    laufendeAdressenId: {
      type: DataTypes.INTEGER,
      unique: false,
      // references: {
      //   model: "adresse",
      //   key: "laufendeAdressenId"
      // },
      allowNull: true
    },
    laufendeZahlungsId: {
      type: DataTypes.INTEGER,
      unique: false,
      // references: {
      //   model: "zahlungsMoeglichkeit",
      //   key: "laufendeZahlungsId"
      // },
      allowNull: true
    },
    bestellDatum: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gewünschtesLieferdatum: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lieferdatum: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "bestellung",
    sequelize
  }
);

export default Bestellung;

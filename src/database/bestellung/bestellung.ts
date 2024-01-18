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
  public isPaypal!: boolean;
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
      // references: {
      //   model: "Adresse",
      //   key: "laufendeAdressenId"
      // },
      allowNull: false
    },
    laufendeZahlungsId: {
      type: DataTypes.UUID,
      unique: false,
      // references: {
      //   model: "zahlungsMoeglichkeiten",
      //   key: "laufendeZahlungsId"
      // },
      allowNull: true
    },
    isPaypal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
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
    tableName: "Bestellung",
    sequelize
  }
);

export default Bestellung;

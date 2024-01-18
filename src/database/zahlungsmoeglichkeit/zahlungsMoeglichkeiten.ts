import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class ZahlungsMoeglichkeiten extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
  public paypalEmail!: string;
  public bankname!: string;
  public bic!: string;
  public iban!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ZahlungsMoeglichkeiten.init(
  {
    laufendeZahlungsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    kundenId: {
      type: DataTypes.UUID,
      references: {
        model: "Kunde",
        key: "kundenId"
      }
    },
    paypalEmail: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    bankname: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    bic: {
      type: new DataTypes.STRING(11),
      allowNull: true
    },
    iban: {
      type: new DataTypes.STRING(34),
      allowNull: true
    }
  },
  {
    tableName: "zahlungsMoeglichkeiten",
    sequelize
  }
);

export default ZahlungsMoeglichkeiten;

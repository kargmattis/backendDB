import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Lastschrift extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
  public BIC!: string;
  public IBAN!: string;
  public Bankname!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lastschrift.init(
  {
    laufendeZahlungsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      // references: {
      //   model: "zahlungsMoeglichkeit",
      //   key: "laufendeZahlungsId"
      // }
    },
    kundenId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
      // references: {
      //   model: "kunde",
      //   key: "kundenId"
      // }
    },
    BIC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IBAN: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Bankname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "lastschrift",
    sequelize
  }
);

export default Lastschrift;

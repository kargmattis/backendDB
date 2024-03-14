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
    },
    kundenId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    BIC: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    IBAN: {
      type: DataTypes.STRING(22),
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

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { HookReturn } from "sequelize/types/hooks";

class ZahlungsMoeglichkeiten extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
  public istAktiv!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ZahlungsMoeglichkeiten.init(
  {
    laufendeZahlungsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
      // autoIncrement: true
    },
    kundenId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "kunde",
        key: "kundenId"
      }
    },
    istAktiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "zahlungsMoeglichkeit",
    sequelize
  }
);

export default ZahlungsMoeglichkeiten;

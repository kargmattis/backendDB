import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { HookReturn } from "sequelize/types/hooks";

class ZahlungsMoeglichkeiten extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
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
    }
  },
  {
    tableName: "zahlungsMoeglichkeit",
    sequelize
  }
);

export default ZahlungsMoeglichkeiten;

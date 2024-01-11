import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

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
      autoIncrement: true,
      primaryKey: true
    },
    kundenId: {
      type: DataTypes.UUID,
      references: {
        model: "Kunde",
        key: "kundenId"
      }
    }
  },
  {
    tableName: "zahlungsMoeglichkeiten",
    sequelize
  }
);

export default ZahlungsMoeglichkeiten;

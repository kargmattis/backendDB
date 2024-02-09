import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class PayPal extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PayPal.init(
  {
    laufendeZahlungsId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "zahlungsMoeglichkeit",
        key: "laufendeZahlungsId"
      }
    },
    paypalEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "payPal",
    sequelize
  }
);

export default PayPal;

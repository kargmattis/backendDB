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
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "zahlungsMoeglichkeit",
        key: "laufendeZahlungsId"
      }
    },
    kundenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "kunde",
        key: "kundenId"
      }
    },
    paypalEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    },
    aktiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "payPal",
    sequelize
  }
);

export default PayPal;

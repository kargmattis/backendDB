import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class PayPal extends Model {
  public kundenId!: string;
  public laufendeZahlungsId!: number;
  public istAktiv!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PayPal.init(
  {
    laufendeZahlungsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      defaultValue: 1
    },
    kundenId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "kunde",
        key: "kundenId"
      }
    },
    istAktiv: {
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

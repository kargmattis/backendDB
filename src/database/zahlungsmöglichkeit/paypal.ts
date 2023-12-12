import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Paypal extends Model {
  public zahlungsId!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Paypal.init(
  {
    zahlungsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "Paypal",
    sequelize
  }
);

export default Paypal;

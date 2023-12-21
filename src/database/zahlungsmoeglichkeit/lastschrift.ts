import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Lastschrift extends Model {
  public kundenId!: string;
  public zahlungsId!: string;
  public bankname!: string;
  public bic!: string;
  public iban!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lastschrift.init(
  {
    zahlungsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    kundenId: {
      type: DataTypes.UUID,
      references: {
        model: "Kunde",
        key: "kundenId"
      }
    },
    bankname: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    bic: {
      type: new DataTypes.STRING(11),
      allowNull: false
    },
    iban: {
      type: new DataTypes.STRING(34),
      allowNull: false
    }
  },
  {
    tableName: "Paypal",
    sequelize
  }
);

export default Lastschrift;

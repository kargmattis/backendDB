import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Adresse extends Model {
  public adressenId!: string;
  public kundenId!: string;
  public postleitzahl!: string;
  public isthauptadresse!: boolean;
  public straße!: string;
  public hausnummer!: string;
  public ort!: string;
  public hausnummerzusatz!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Adresse.init(
  {
    adressenId: {
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
    postleitzahl: {
      type: new DataTypes.STRING(10),
      allowNull: false
    },
    isthauptadresse: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    straße: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    hausnummer: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    ort: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    hausnummerzusatz: {
      type: new DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    tableName: "Adresse",
    sequelize
  }
);

export default Adresse;

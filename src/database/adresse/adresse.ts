import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Adresse extends Model {
  public adressenId!: string;
  public laufendeAdressenId!: number;
  public kundenId!: string;
  public postleitzahl!: string;
  public strasse!: string;
  public hausnummer!: string;
  public ort!: string;
  public hausnummerzusatz!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Adresse.init(
  {
    laufendeAdressenId: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      defaultValue: 1
    },
    adressenId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    kundenId: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: "Kunde",
        key: "kundenId"
      }
    },
    postleitzahl: {
      type: new DataTypes.STRING(10),
      allowNull: false
    },
    strasse: {
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

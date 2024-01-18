import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Kunde extends Model {
  public kundenId!: string;
  public email!: string;
  public vorname!: string;
  public passwort!: string;
  public telefonnummer!: string;
  public nachname!: string;
  public zeitungsaboablaufdatum!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Kunde.init(
  {
    kundenId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      unique: true
    },
    vorname: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    nachname: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    passwort: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    telefonnummer: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zeitungsaboablaufdatum: {
      type: DataTypes.DATE,
      allowNull: true
    },
    istAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "kunde",
    sequelize
  }
);

export default Kunde;

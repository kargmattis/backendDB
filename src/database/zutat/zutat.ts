import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Zutat extends Model {
  public zutatsId!: string;
  public zutatsname!: string;
  public zutatseigenschaft!: string;
  public zutatspreis!: number;
  public zutatseinheit!: string;
  public zutatBild!: string;
  public zutatensparte!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Zutat.init(
  {
    zutatsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    zutatsname: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zutatseigenschaft: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zutatspreis: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    zutatseinheit: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zutatBild: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zutatensparte: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "Zutat",
    sequelize
  }
);

export default Zutat;

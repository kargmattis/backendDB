import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Zutat extends Model {
  public zutatsId!: string;
  public zutatseigenschaft!: string;
  public zutatsprice!: number;
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
    zutatsEigenschaft: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    zutatsprice: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: "Zutat",
    sequelize
  }
);

export default Zutat;

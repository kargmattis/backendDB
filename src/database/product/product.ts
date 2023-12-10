import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public hello!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hello: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "product",
    sequelize,
  }
);

export default Product;

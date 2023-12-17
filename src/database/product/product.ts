import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Product extends Model {
  public productId!: string;
  public title!: string;
  public price!: number;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kundenId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  },
  {
    tableName: "Product",
    sequelize
  }
);

export default Product;

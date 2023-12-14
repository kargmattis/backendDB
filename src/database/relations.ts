import Bestellung from "./bestellung/bestellung";
import { sequelize } from "./database";
import Product from "./product/product";

Product.belongsToMany(Bestellung, {
  through: "bestellung_product"
});
Bestellung.belongsToMany(Product, {
  through: "bestellung_product"
});

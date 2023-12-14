import Bestellung from "./bestellung/bestellung";
import Bestellungposition from "./bestellungsPosition/bestellungsPosition";
import Product from "./product/product";

Product.belongsToMany(Bestellung, {
  through: Bestellungposition
});
Bestellung.belongsToMany(Product, {
  through: Bestellungposition
});

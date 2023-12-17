import Adresse from "./adresse/addresse";
import Bestellung from "./bestellung/bestellung";
import Bestellungposition from "./bestellungsPosition/bestellungsPosition";
import Kunde from "./kunde/kunde";
import Product from "./product/product";
import Paypal from "./zahlungsmöglichkeit/paypal";
import Zutat from "./zutat/zutat";
import ZutatenPosition from "./zutatenPostion/zutatenPosition";
// m zu n Beziehung
Product.belongsToMany(Bestellung, {
  through: Bestellungposition
});
// m zu n Beziehung
Bestellung.belongsToMany(Product, {
  through: Bestellungposition
});
// 1 zu n Beziehung
Adresse.hasMany(Bestellung);
Bestellung.belongsTo(Adresse);
// 1 zu n Beziehung
Paypal.hasMany(Bestellung);
Bestellung.belongsTo(Paypal);
// 1 zu n Beziehung
Kunde.hasMany(Paypal, { foreignKey: "kundenId" });
Paypal.belongsTo(Kunde);
// 1 zu n Beziehung
Kunde.hasMany(Adresse, { foreignKey: "kundenId" });
Adresse.belongsTo(Kunde);
// 1 zu n Beziehung
// Todo wo kommt Zutatenmenge dazu , weil an Relation?
Product.belongsToMany(Zutat, {
  through: ZutatenPosition
});

Zutat.belongsToMany(Product, {
  through: ZutatenPosition
});

import Adresse from "./adresse/adresse";
import Bestellung from "./bestellung/bestellung";
import Bestellungposition from "./bestellungsPosition/bestellungsPosition";
import Kunde from "./kunde/kunde";
import Produkt from "./produkt/produkt";
import Paypal from "./zahlungsmoeglichkeit/paypal";
import Zutat from "./zutat/zutat";
import ZutatenPosition from "./zutatenPostion/zutatenPosition";
// m zu n Beziehung
Produkt.belongsToMany(Bestellung, {
  through: Bestellungposition
});
// m zu n Beziehung
Bestellung.belongsToMany(Produkt, {
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
Produkt.belongsToMany(Zutat, {
  through: ZutatenPosition
});

Zutat.belongsToMany(Produkt, {
  through: ZutatenPosition
});

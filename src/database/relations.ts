import { ProgramUpdateLevel } from "typescript";
import Adresse from "./adresse/adresse";
import Bestellung from "./bestellung/bestellung";
import Bestellungposition from "./bestellungsPosition/bestellungsPosition";
import Kunde from "./kunde/kunde";
import Produkt from "./produkt/produkt";
import ZahlungsMoeglichkeiten from "./zahlungsmoeglichkeit/zahlungsMoeglichkeiten";
import Zutat from "./zutat/zutat";
import ZutatenPosition from "./zutatenPostion/zutatenPosition";
//m zu n Beziehung
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
Kunde.hasMany(ZahlungsMoeglichkeiten, { foreignKey: "kundenId" });
ZahlungsMoeglichkeiten.belongsTo(Kunde);
// 1 zu n Beziehung
Kunde.hasMany(Adresse, { foreignKey: "kundenId" });
Adresse.belongsTo(Kunde);
// 1 zu n Beziehung
Produkt.belongsToMany(Zutat, {
  through: ZutatenPosition
});
Produkt.belongsTo(Kunde);
Kunde.hasMany(Produkt);

Zutat.belongsToMany(Produkt, {
  through: ZutatenPosition
});

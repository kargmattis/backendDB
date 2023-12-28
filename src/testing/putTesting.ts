import Adresse from "../database/adresse/adresse";
import Bestellung from "../database/bestellung/bestellung";
import Kunde from "../database/kunde/kunde";
import Produkt from "../database/produkt/produkt";
import Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import Paypal from "../database/zahlungsmoeglichkeit/paypal";
import Zutat from "../database/zutat/zutat";

export function putTesting(
  databaseEntries: [
    Produkt,
    Kunde,
    Paypal,
    Lastschrift,
    Adresse,
    Zutat,
    Bestellung
  ]
) {
  //TODO: putTesting
  console.log("putTesting started", databaseEntries);
}

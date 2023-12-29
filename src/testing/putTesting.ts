import type Adresse from "../database/adresse/adresse";
import type Bestellung from "../database/bestellung/bestellung";
import type Kunde from "../database/kunde/kunde";
import type Produkt from "../database/produkt/produkt";
import type Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import type Paypal from "../database/zahlungsmoeglichkeit/paypal";
import type Zutat from "../database/zutat/zutat";

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
  // TODO: putTesting
  console.log("putTesting started", databaseEntries);
}

import type Adresse from "../database/adresse/adresse";
import putAdresse from "../database/adresse/operation/putAdresse";
import type Bestellung from "../database/bestellung/bestellung";
import type Kunde from "../database/kunde/kunde";
import putKunde from "../database/kunde/operation/putKunde";
import type Produkt from "../database/produkt/produkt";
import type Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import type Paypal from "../database/zahlungsmoeglichkeit/paypal";
import type Zutat from "../database/zutat/zutat";
import {
  AdresseCreationAttributes,
  KundeCreationAttributes
} from "../global/types";

const updateKunde: KundeCreationAttributes = {
  email: "updatetEmail",
  vorname: "updatetVorname",
  nachname: "updatetNachname",
  passwort: "updatetPasswort",
  telefonnummer: "updatetTelefonnummer",
  zeitungsaboablaufdatum: new Date()
};
const updateAdresse: AdresseCreationAttributes = {
  kundenId: "",
  postleitzahl: "updatetPostleitzahl",
  isthauptadresse: true,
  strasse: "updatetStrasse",
  hausnummer: "updatetHausnummer",
  ort: "updatetOrt",
  hausnummerzusatz: "updatetHausnummerzusatz"
};

export async function putTesting(
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
  const [produkt, kunde, paypal, lastschrift, adresse, zutat, bestellung] =
    databaseEntries;
  await putKunde(updateKunde, kunde.kundenId);
  updateAdresse.kundenId = kunde.kundenId;
  await putAdresse(updateAdresse, adresse.adressenId);
  console.log("putTesting", "done");
}

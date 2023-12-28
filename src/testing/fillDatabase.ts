import Adresse from "../database/adresse/adresse";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import Bestellung from "../database/bestellung/bestellung";
import { addBestellung } from "../database/bestellung/operations/addBestellung";
import Kunde from "../database/kunde/kunde";
import { createKunde } from "../database/kunde/operation/createKunde";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import Produkt from "../database/produkt/produkt";
import Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import { createLastschriftRecord } from "../database/zahlungsmoeglichkeit/operation/addLastschrift";
import { createPaypalRecord } from "../database/zahlungsmoeglichkeit/operation/addPaypal";
import Paypal from "../database/zahlungsmoeglichkeit/paypal";
import { createZutat } from "../database/zutat/operations/createZutat";
import Zutat from "../database/zutat/zutat";
import { PaypalCreationAttributes } from "../global/types";

// Erstellen eines Testprodukts mit den notwendigen Eigenschaften
const testProdukt = {
  titel: "Testprodukt",
  preis: 100,
  bild: "testbild"
};

const testLastschrift = {
  kundenId: "",
  bankname: "Testbank",
  bic: "TESTBIC",
  iban: "TESTIBAN"
};

// Erstellen einer Testzutat mit den notwendigen Eigenschaften
const testZutat = {
  zutatsname: "Mehl",
  zutatseigenschaft: "vegan",
  zutatspreis: 1,
  zutatseinheit: "g"
};

// Erstellen eines Testkunden mit den notwendigen Eigenschaften
const testKunde = {
  email: "example@gmail.com",
  vorname: "Max",
  nachname: "Mustermann",
  passwort: "123456",
  telefonnummer: "0123456789",
  zeitungsaboablaufdatum: new Date()
};

// Erstellen einer Testadresse mit den notwendigen Eigenschaften
const testAdresse = {
  kundenId: "",
  postleitzahl: "12345",
  isthauptadresse: true,
  strasse: "Musterstraße",
  hausnummer: "123",
  ort: "Musterort",
  hausnummerzusatz: "a"
};

const testBestellung = {
  adressenId: "",
  zahlungsId: "",
  bestellDatum: new Date(),
  gewünschtesLieferdatum: new Date(),
  produktIds: [] as string[]
};

// Die Funktion fillDatabase ist eine asynchrone Funktion, die beim Aufruf versucht, eine Reihe von Operationen auszuführen.
export const fillDatabase = async (): Promise<
  [Produkt, Kunde, Paypal, Lastschrift, Adresse, Zutat, Bestellung] | undefined
> => {
  try {
    // wartet auf alles Promises und gibt die Ergebnisse in der Reihenfolge zurück, in der sie aufgerufen wurden
    console.log("fillDatabase started");
    console.log("test 1 started: kunde, produkt");

    const [createdProduct, createdKunde] = await Promise.all([
      createProdukt(testProdukt),
      createKunde(testKunde)
    ]);
    console.log("succes Produkt: ", createdProduct.dataValues);
    console.log("succes Kunde: ", createdKunde.dataValues);

    console.log("test 2 started: paypal");
    const createPaypal = await createPaypalRecord({
      kundenId: createdKunde.kundenId,
      email: createdKunde.email
    });
    console.log("succes Paypal: ", createPaypal.dataValues);

    testAdresse.kundenId = createdKunde.kundenId;
    testLastschrift.kundenId = createdKunde.kundenId;
    console.log("test 3 started: lastschrift, adresse, zutat");

    const [createdLastschrift, createdAdresse, createdZutat] =
      await Promise.all([
        createLastschriftRecord(testLastschrift),
        createAdresse(testAdresse),
        createZutat(testZutat)
      ]);
    console.log("succes Lastschrift: ", createdLastschrift.dataValues);
    console.log("succes Adresse: ", createdAdresse.dataValues);
    console.log("succes Zutat: ", createdZutat.dataValues);

    testBestellung.adressenId = createdAdresse.adressenId;
    testBestellung.zahlungsId = createPaypal.zahlungsId;
    testBestellung.produktIds.push(createdProduct.produktId);
    console.log("test 4 started: bestellung");
    const createdBestellung = await addBestellung(testBestellung);
    console.log("succes Bestellung: ", createdBestellung.dataValues);

    return [
      createdProduct,
      createdKunde,
      createPaypal,
      createdLastschrift,
      createdAdresse,
      createdZutat,
      createdBestellung
    ];
  } catch (error) {
    console.log("testing failed !!!!!!!!!!");
  }
};

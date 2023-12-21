import { createAdresse } from "../database/adresse/operation/createAdresse";
import { addBestellung } from "../database/bestellung/operations/addBestellung";
import { createKunde } from "../database/kunde/operation/createKunde";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import { createLastschriftRecord } from "../database/zahlungsmoeglichkeit/operation/addLastschrift";
import { createPaypalRecord } from "../database/zahlungsmoeglichkeit/operation/addPaypal";
import { createZutat } from "../database/zutat/operations/createZutat";

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
  gewünschtesLieferdatum: new Date()
};

// Die Funktion fillDatabase ist eine asynchrone Funktion, die beim Aufruf versucht, eine Reihe von Operationen auszuführen.
export const fillDatabase = async () => {
  try {
    // Ein Produkt wird erstellt, indem die Funktion createProdukt mit dem Testprodukt als Argument aufgerufen wird.
    const createdProduct = await createProdukt(testProdukt);
    console.log("createdProduct: ", createdProduct.dataValues);

    // Ein Kunde wird erstellt, indem die Funktion createKunde mit dem Testkunden als Argument aufgerufen wird.
    const createdKunde = await createKunde(testKunde);
    console.log("createdKunde: ", createdKunde.dataValues);
    // Ein PayPal-Datensatz wird erstellt, indem die Funktion createPaypalRecord mit einem Objekt aufgerufen wird, das die Kunden-ID und E-Mail des erstellten Kunden enthält.
    const createPaypal = await createPaypalRecord({
      kundenId: createdKunde.kundenId,
      email: createdKunde.email
    });
    // Die Kunden-ID des erstellten Kunden wird der Testadresse zugewiesen.
    testAdresse.kundenId = createdKunde.kundenId;
    testLastschrift.kundenId = createdKunde.kundenId;
    const createdLastschrift = await createLastschriftRecord(testLastschrift);
    // Eine Adresse wird erstellt, indem die Funktion createAdresse mit der Testadresse als Argument aufgerufen wird.
    const createdAdresse = await createAdresse(testAdresse);
    console.log("createdAdresse: ", createdAdresse.dataValues);
    testBestellung.adressenId = createdAdresse.adressenId;
    testBestellung.zahlungsId = createPaypal.zahlungsId;
    const createdZutat = await createZutat(testZutat);
    console.log("createdZutat: ", createdZutat.dataValues);

    const createdBestellung = await addBestellung(testBestellung);
    console.log("createdBestellung: ", createdBestellung.dataValues);

    // addBestellung([createdProduct.produktId]);
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

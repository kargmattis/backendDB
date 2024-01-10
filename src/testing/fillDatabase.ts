import type Adresse from "../database/adresse/adresse";
import { createAdresse } from "../database/adresse/operation/createAdresse";
import type Bestellung from "../database/bestellung/bestellung";
import {
  addOrOpenWarenkorbBestellung,
  placeOrder
} from "../database/bestellung/operations/addBestellung";
import type Kunde from "../database/kunde/kunde";
import { createKunde } from "../database/kunde/operation/createKunde";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import type Produkt from "../database/produkt/produkt";
import type Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import { createLastschriftRecord } from "../database/zahlungsmoeglichkeit/operation/addLastschrift";
import { createPaypalRecord } from "../database/zahlungsmoeglichkeit/operation/addPaypal";
import type Paypal from "../database/zahlungsmoeglichkeit/paypal";
import { createZutat } from "../database/zutat/operations/createZutat";
import type Zutat from "../database/zutat/zutat";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import { PaypalCreationAttributes } from "../global/types";
import Products from "./ProduktArray";
import Zutaten from "./ZutatenArray";

// Erstellen eines Testprodukts mit den notwendigen Eigenschaften
const testLastschrift = {
  kundenId: "",
  bankname: "Testbank",
  bic: "TESTBIC",
  iban: "TESTIBAN"
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
  strasse: "Musterstraße",
  hausnummer: "123",
  ort: "Musterort",
  hausnummerzusatz: "a"
};
// Die Funktion fillDatabase ist eine asynchrone Funktion, die beim Aufruf versucht, eine Reihe von Operationen auszuführen.
export const fillDatabase = async (): Promise<
  [Produkt, Kunde, Paypal, Lastschrift, Adresse, Zutat, Bestellung] | undefined
> => {
  try {
    // wartet auf alles Promises und gibt die Ergebnisse in der Reihenfolge zurück, in der sie aufgerufen wurden
    console.log("fillDatabase started");
    console.log("test 1 started: kunde, produkte");

    const createdKunde = await createKunde(testKunde);
    const createdProducts = await Promise.all(
      Products.map(async (element) => {
        return createProdukt(element);
      })
    ).catch((error) => {
      console.log("test 1 failed: kunde, produkte");
      throw new Error(error);
    });

    const createdProduct = createdProducts[0];

    const createdZutaten = await Promise.all(
      Zutaten.map(async (element) => {
        return createZutat(element);
      })
    ).catch((error) => {
      console.log("test 1 failed: kunde, zutaten");
      throw new Error(error);
    });

    const createdZutat = createdZutaten[0];

    console.log("test 2 started: paypal");
    const createPaypal = await createPaypalRecord({
      kundenId: createdKunde.kundenId,
      email: createdKunde.email
    }).catch((error) => {
      console.log("test 2 failed: paypal");
      throw new Error(error);
    });
    testAdresse.kundenId = createdKunde.kundenId;
    testLastschrift.kundenId = createdKunde.kundenId;
    console.log("test 3 started: lastschrift, adresse, zutat");

    const [createdLastschrift, createdAdresse] = await Promise.all([
      createLastschriftRecord(testLastschrift),
      createAdresse(testAdresse)
    ]).catch((error) => {
      console.log("test 3 failed: lastschrift, adresse, zutat");
      throw new Error(error);
    });

    console.log("test 4 started: Warenkorb");

    await addOrOpenWarenkorbBestellung({
      kundenId: createdKunde.kundenId,
      produktId: createdProduct.produktId,
      produktMenge: 200
    }).catch((error) => {
      console.log("test 4 failed: Warenkorb");
      throw new Error(error);
    });
    await addOrOpenWarenkorbBestellung({
      kundenId: createdKunde.kundenId,
      produktId: createdProducts[1].produktId,
      produktMenge: 200
    }).catch((error) => {
      console.log("test 4 failed: Warenkorb");
      throw new Error(error);
    });
    console.log("test 5 started: Bestellung aufgeben");
    const placedOrder = await placeOrder({
      zahlungsId: createPaypal.zahlungsId,
      bestellDatum: new Date(),
      kundenId: createdKunde.kundenId,
      gewünschtesLieferdatum: new Date()
    }).catch((error) => {
      console.log("test 5 failed: Bestellung aufgeben");
      throw new Error(error);
    });

    await addOrOpenWarenkorbBestellung({
      kundenId: createdKunde.kundenId,
      produktId: createdProduct.produktId,
      produktMenge: 200
    });
    console.log("test 6 started: ZutatenPosition");
    const createdZutatenPosition = await addProduktZutatRelation({
      produktId: createdProduct.produktId,
      zutatIdWithAmount: [
        { zutatenId: createdZutat.zutatsId, zutatenMenge: "100" }
      ]
    }).catch((error) => {
      console.log("test 6 failed: ZutatenPosition");
      throw new Error(error);
    });

    return [
      createdProduct,
      createdKunde,
      createPaypal,
      createdLastschrift,
      createdAdresse,
      createdZutat,
      placedOrder
    ];
  } catch (error) {
    console.log(error);

    console.log("testing failed !!!!!!!!!!");
  }
};

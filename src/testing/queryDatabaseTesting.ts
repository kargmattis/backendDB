import Adresse from "../database/adresse/adresse";
import { findAdresseByKundenId } from "../database/adresse/operation/findAdresse";
import Bestellung from "../database/bestellung/bestellung";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import Kunde from "../database/kunde/kunde";
import {
  findKunde,
  findKundeByEmail
} from "../database/kunde/operation/findKunde";
import {
  findProductWithoutKundeId,
  findProduktByKundeId,
  findProduktByPk
} from "../database/produkt/operations/findProdukt";
import Produkt from "../database/produkt/produkt";
import Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
import Paypal from "../database/zahlungsmoeglichkeit/paypal";
import Zutat from "../database/zutat/zutat";

export async function queryDatabaseTesting(
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
  await queryKunde(kunde);
  await queryProdukt(produkt);
  await queryAdresse(kunde.kundenId);
  await queryBestellung(bestellung.bestellungsId, kunde.kundenId);
}

async function queryKunde(kunde: Kunde) {
  try {
    await findKunde(kunde.kundenId).then((kunde) => {
      console.log("queryKunde", kunde.dataValues);
    });
    await findKundeByEmail(kunde.email).then((kunde) => {
      console.log("queryKunde", kunde);
    });
  } catch (error) {
    console.error("queryKunde", error);
  }
}

async function queryProdukt(produkt: Produkt) {
  try {
    await findProduktByPk(produkt.produktId).then((produkt) => {
      console.log("queryProdukt", produkt?.dataValues);
    });
    await findProductWithoutKundeId().then((produkte) => {
      console.log("query generellProdukt", produkte);
    });
    await findProduktByKundeId(produkt.produktId).then((produkte) => {
      console.log("queryProduktByKundeId", produkte);
    });
  } catch (error) {
    console.error("queryProdukt", error);
  }
}

async function queryAdresse(kundeId: string) {
  try {
    await findAdresseByKundenId(kundeId).then((adresse) => {
      console.log("queryAdresse", adresse.dataValues);
    });
  } catch (error) {
    console.error("queryAdresse", error);
  }
}

async function queryBestellung(bestellungsId: string, kundenId: string) {
  try {
    const singleBestellung = await findSingleBestellung(bestellungsId);
    const bestellungen = await findAllBestellungen(kundenId);
    console.log("singlequeryBestellung", singleBestellung);
    console.log("queryBestellung", bestellungen);
  } catch (error) {
    console.error("queryZutat", error);
  }
}

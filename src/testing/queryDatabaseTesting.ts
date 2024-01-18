import type Adresse from "../database/adresse/adresse";
import type Bestellung from "../database/bestellung/bestellung";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import type Kunde from "../database/kunde/kunde";
import {
  findKunde,
  findKundeByEmail
} from "../database/kunde/operation/findKunde";
import {
  findProductWithoutKundeId,
  findProduktByKundeId,
  findProduktByPk
} from "../database/produkt/operations/findProdukt";
import type Produkt from "../database/produkt/produkt";
// import type Lastschrift from "../database/zahlungsmoeglichkeit/lastschrift";
// import type Paypal from "../database/zahlungsmoeglichkeit/paypal";
import type Zutat from "../database/zutat/zutat";

export async function queryDatabaseTesting(
  databaseEntries: [
    Produkt,
    Kunde,
    // Paypal,
    // Lastschrift,
    Adresse,
    Zutat,
    Bestellung
  ]
) {
  // const [produkt, kunde, paypal, lastschrift, adresse, zutat, bestellung] =
  //   databaseEntries;
  // await queryKunde(kunde);
  // await queryProdukt(produkt);
  // // await queryAdresse(kunde.kundenId);
  // await queryBestellung(bestellung.bestellungsId, kunde.kundenId);
  console.log("queryDatabaseTesting", "done");
}

// async function queryKunde(kunde: Kunde) {
//   try {
//     await findKunde(kunde.kundenId).catch((error) => {
//       console.log("findKunde failed");
//       throw new Error(error);
//     });
//     await findKundeByEmail(kunde.email).catch((error) => {
//       console.log("findKundeByEmail failed");
//       throw new Error(error);
//     });
//   } catch (error) {
//     throw new Error("queryKunde failed");
//   }
// }

// async function queryProdukt(produkt: Produkt) {
//   try {
//     await findProduktByPk(produkt.produktId).catch((error) => {
//       console.log("findProduktByPk failed");
//       throw new Error(error);
//     });
//     await findProductWithoutKundeId().catch((error) => {
//       console.log("findProductWithoutKundeId failed");
//       throw new Error(error);
//     });
//     await findProduktByKundeId(produkt.produktId).catch((error) => {
//       console.log("findProduktByKundeId failed");
//       throw new Error(error);
//     });
//   } catch (error) {
//     throw new Error(error + "queryProdukt failed");
//   }
// }

// // async function queryAdresse(kundeId: string) {
// //   try {
// //     await findAdresseByKundenId(kundeId).catch((error) => {
// //       console.log("findAdresseByKundenId failed");
// //       throw new Error(error);
// //     });
// //   } catch (error) {
// //     console.error("queryAdresse", error);
// //   }
// // }

// async function queryBestellung(bestellungsId: string, kundenId: string) {
//   try {
//     await findSingleBestellung(bestellungsId).catch((error) => {
//       console.log("findSingleBestellung failed");
//       throw new Error(error);
//     });
//     await findAllBestellungen(kundenId).catch((error) => {
//       console.log("findAllBestellungen failed");
//       throw new Error(error);
//     });
//   } catch (error) {
//     console.error("queryZutat", error);
//   }
// }

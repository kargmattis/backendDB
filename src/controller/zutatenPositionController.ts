import express from "express";
import CustomError from "../utilities/error";
import { findAllProductsIngridiendsRelations } from "../database/zutatenPostion/operation/findProductsIngridientsRelations";
import Zutat from "../database/zutat/zutat";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import {
  ProduktCreationAttributes,
  ZutatenPositionCreationAttributes,
  ZutatenPostitionObject
} from "../global/types";
export const ZutatenPositionController = express.Router();
import { createProdukt } from "../database/produkt/operations/createProdukt";
import { createZutat } from "../database/zutat/operations/createZutat";
import ZutatenPosition from "../database/zutatenPostion/zutatenPosition";

interface AusgewählteZutat {
  zutatId: string;
  zutatMenge: string;
}

interface KonfiguriertesProdukt {
  kundenId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  zutat: Array<AusgewählteZutat>;
}

/* interface AusgewählteZutat {
  zutatId: string;
  zutatMenge: number;
} */

ZutatenPositionController.get("/KundenProdukt", (_req, res) => {
  findAllProductsIngridiendsRelations()
    .then((zutatPosition) => {
      res.status(200).json(zutatPosition);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ZutatenPositionController.post("/KundenProdukt", (req, res) => {
  // 1. vom Frontend kommen Zutatid, Zutatenmenge, Kundenid
  const importedProduct: KonfiguriertesProdukt = {
    titel: req.body.titel,
    preis: 11, // automatische Berechnung im Backend
    bild: "Logo.webp",
    sparte: "KundenProdukt",
    kundenId: req.body.kundenId,
    zutat: req.body.zutat
  };

  const zwischenspeicherungprodukt: ProduktCreationAttributes = {
    titel: importedProduct.titel,
    preis: importedProduct.preis,
    bild: importedProduct.bild,
    sparte: importedProduct.sparte,
    kundenId: importedProduct.kundenId
  };

  let productID = "";

  // 2. Produkt erstellen
  createProdukt(zwischenspeicherungprodukt)
    .then((produkt) => {
      res.status(201).json(produkt);
      productID = produkt.produktId;
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });

  console.log(productID);

  if (importedProduct.zutat.length > 0) {
    const zutatenPosition: ZutatenPositionCreationAttributes = {
      produktId: productID,
      zutatIdWithAmount: [
        {
          zutatsId: importedProduct.zutat[0].zutatId,
          zutatenMenge: importedProduct.zutat[0].zutatMenge
        }
      ]
    };
  }

  /*interface KonfiguriertesProdukt {
    kundenId: string;
    titel: string;
    preis: number;
    bild: string;
    sparte: string;
    zutat: Array<AusgewählteZutat>;
  }
  
  interface AusgewählteZutat {
    zutatId: string;
    zutatMenge: number;  ---> Achtung
  } 
  
  export type ZutatenPositionCreationAttributes = {
  produktId: string;
  zutatIdWithAmount: ZutatenPostitionObject[];
};

export type ZutatenPostitionObject = {
  zutatsId: string;
  zutatenMenge: string;  ---> Achtung
};*/

  // 3. ZutatenPosition speichern
  // addProduktZutatRelation(zutatenPosition)
  //   .then((zutatenPosition) => {
  //     res.status(200).json(zutatenPosition);
  //   })
  //   .catch((error: any) => {
  //     console.error(error);
  //     res
  //       .status(error.statusCode || 500)
  //       .send(error.message || "An error occurred");
  //   });

  // const pro =  await Promise.all(
  //    async (importedProduct) => {
  //     return await createProdukt(importedProduct);
  //   })
  // ).catch((error) => {
  //   console.log("test 1 failed: kunde, produkte");
  //   throw new Error(error);
  // });

  // //3. ZutatenPosition speichern
  // addProduktZutatRelation(zutatenPosition)
  //   .then((zutatPosition) => {
  //     res.status(201).json(zutatPosition);
  //   })
  //   .catch((error: CustomError) => {
  //     res.status(error.statusCode).send(error.message);
  //   });
});

// let zutatenPosition: ZutatenPositionCreationAttributes = req.body;

// // Überprüfen, ob zutatIdWithAmount ein Array ist
// if (!Array.isArray(zutatenPosition.zutatIdWithAmount)) {
//   return res.status(400).send("zutatIdWithAmount must be an array");
// }

// // Überprüfen, ob jedes Element in zutatIdWithAmount die erforderlichen Felder hat
// for (const zutat of zutatenPosition.zutatIdWithAmount) {
//   if (!zutat.zutatsId || !zutat.zutatenMenge) {
//     return res
//       .status(400)
//       .send("Each zutat must have a zutatsId and zutatenMenge");
//   }
// }

// addProduktZutatRelation(zutatenPosition)
//   .then((zutatenPosition) => {
//     res.status(200).json(zutatenPosition);
//   })
//   .catch((error: any) => {
//     console.error(error);
//     res
//       .status(error.statusCode || 500)
//       .send(error.message || "An error occurred");
//   });
// });

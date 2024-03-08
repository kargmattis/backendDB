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
import { Request, Response } from "express";
import { errorChecking } from "../utilities/errorChecking";

interface AusgewählteZutat {
  zutatsId: string;
  zutatenMenge: string;
}

interface KonfiguriertesProdukt {
  kundenId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  zutaten: Array<AusgewählteZutat>;
}

ZutatenPositionController.get("/KundenProdukt", (_req, res) => {
  findAllProductsIngridiendsRelations()
    .then((zutatPosition) => {
      res.status(200).json(zutatPosition);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

async function getZutaten(zutaten: Array<AusgewählteZutat>): Promise<number> {
  let preis: number = 0;
  for (const zutat1 of zutaten) {
    const zutat = await Zutat.findByPk(zutat1.zutatsId);
    if (zutat) {
      preis += zutat.zutatspreis * parseInt(zutat1.zutatenMenge);
    }
  }
  return parseFloat(preis.toFixed(2));
}

async function gesamtPreis(req: Request, res: Response) {
  // 1. vom Frontend kommen Zutatid, Zutatenmenge, Kundenid
  try {
    const importedProduct: KonfiguriertesProdukt = {
      titel: req.body.titel,
      preis: await getZutaten(req.body.zutat), // await the getZutaten function to resolve the promise
      bild: "Logo.webp", //jedes Kundenprodukt erhält als Produktbild das Logo
      sparte: "KundenProdukt",
      kundenId: req.body.kundenId,
      zutaten: req.body.zutat
    };
    // console.log(importedProduct);

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
        productID = produkt.produktId;
      })
      // 3. Zutatrelationen erstellen
      .then(() => {
        const zutatenPosition: ZutatenPositionCreationAttributes = {
          produktId: productID,
          zutatIdWithAmount: importedProduct.zutaten
        };
        addProduktZutatRelation(zutatenPosition);
      })
      .then(() => {
        res.status(201).json(productID);
      })
      .catch((error: CustomError) => {
        const err = errorChecking(error);
        throw new CustomError(err.statusCode, err.message);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("unknown error");
  }
}

ZutatenPositionController.post("/KundenProdukt", async (req, res) => {
  try {
    await gesamtPreis(req, res);
  } catch (error) {
    res.status(500).send("unknown error");
  }
});
